const routineData = [
  { 
    day: "Monday", 
    entries: [
      { time: "09:15 – 10:30", course: "HUM 4249", teacher: "FM (BTM)", room: "R106" },
      { 
        time: "10:30 – 13:00", 
        course: "Math 4241 (100 mins)", 
        teacher: "AKA (NSc)", 
        room: "R109 (ABS)",
        colspan: 2
      },
      { time: "13:00 – 14:30", course: "Break" },
      { time: "14:30 – 15:45", course: "CSE 4206", teacher: "THS", room: "L-1" }
    ]
  },
  { 
    day: "Tuesday", 
    entries: [
      { time: "08:00 – 09:15", course: "CSE 4205", teacher: "AAR", room: "R108 (ABS)" },
      { time: "09:15 – 10:30", course: "SWE 4201", teacher: "JN", room: "R109 (ABS)" },
      { 
        time: "10:30 – 13:00", 
        course: "SWE 4202", 
        teacher: "JN / MNR", 
        room: "L-1",
        colspan: 2
      },
      { time: "13:00 – 14:30", course: "Break" },
      { time: "14:30 – 15:45", course: "HUM 4247", teacher: "TAH (BTM)", room: "R105 (ABS)" }
    ]
  },
  { 
    day: "Wednesday", 
    entries: [
      { 
        time: "08:00 – 10:30", 
        course: "SWE 4204", 
        teacher: "JN / MNR", 
        room: "L-1",
        colspan: 2
      },
      { 
        time: "10:30 – 13:00", 
        course: "HUM 4242 (100 mins)", 
        teacher: "ARMK", 
        room: "R-304",
        colspan: 2
      },
      { time: "13:00 – 14:30", course: "Break" }
    ]
  },
  { 
    day: "Thursday", 
    entries: [
      { time: "08:00 – 09:15", course: "CSE 4205", teacher: "AAR", room: "R108 (ABS)" },
      { time: "09:15 – 10:30", course: "CSE 4203", teacher: "AZM", room: "R105 (ABS)" },
      { 
        time: "10:30 – 13:00", 
        course: "Math 4241 (100 mins)", 
        teacher: "AKA (NSc)", 
        room: "R109 (ABS)",
        colspan: 2
      },
      { time: "13:00 – 14:30", course: "Break" },
      { time: "14:30 – 15:45", course: "SWE 4201", teacher: "JN", room: "R105 (ABS)" }
    ]
  },
  { 
    day: "Friday", 
    entries: [
      { time: "08:00 – 09:15", course: "HUM 4249", teacher: "FM (BTM)", room: "R108 (ABS)" },
      { time: "09:15 – 10:30", course: "HUM 4247", teacher: "TAH (BTM)", room: "R105 (ABS)" },
      { time: "10:30 – 11:45", course: "Break" },
      { time: "11:45 – 13:00", course: "CSE 4203", teacher: "AZM", room: "R108 (ABS)" },
      { time: "13:00 – 14:30", course: "Break" }
    ]
  }
];

function isLab(course) {
  return course === "SWE 4202" || course === "SWE 4204" || course === "CSE 4206";
}

function showRoutine() {
  const tbody = document.getElementById("routine-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  const times = [
    "08:00 – 09:15",
    "09:15 – 10:30",
    "10:30 – 11:45",
    "11:45 – 13:00",
    "13:00 – 14:30",
    "14:30 – 15:45",
    "15:45 – 17:00"
  ];

  // Create header row
  const headerRow = document.createElement("tr");
  const emptyHeader = document.createElement("th");
  emptyHeader.textContent = "";
  headerRow.appendChild(emptyHeader);

  times.forEach(time => {
    const th = document.createElement("th");
    th.textContent = time;
    headerRow.appendChild(th);
  });

  tbody.appendChild(headerRow);

  // Create rows for each day
  routineData.forEach(dayData => {
    const tr = document.createElement("tr");
    const dayTd = document.createElement("td");
    dayTd.textContent = dayData.day;
    tr.appendChild(dayTd);

    let skipCells = 0;

    times.forEach((time, timeIndex) => {
      if (skipCells > 0) {
        skipCells--;
        return;
      }

      const td = document.createElement("td");
      const entry = dayData.entries.find(e => e.time.startsWith(time.split(' – ')[0]));

      if (entry) {
        let courseDisplay = `<strong>${entry.course}</strong><br>`;
        if (entry.teacher) courseDisplay += `${entry.teacher}<br>`;
        if (entry.room) courseDisplay += `Room: ${entry.room}`;

        if (isLab(entry.course)) {
          const group = localStorage.getItem(`${entry.course}_group`) || "Not Assigned";
          courseDisplay += `<br><em>Group: ${group}</em>`;
        }

        td.innerHTML = courseDisplay;
        
        if (entry.colspan) {
          td.colSpan = entry.colspan;
          skipCells = entry.colspan - 1;
        }
      }
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if (user === 'admin' && pass === 'admin') {
    localStorage.setItem('loggedIn', 'true');
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
    renderAdminPanel();
  } else {
    alert('Invalid credentials');
  }
}

function renderAdminPanel() {
  if (localStorage.getItem("loggedIn") !== "true") return;

  const labsContainer = document.getElementById("labs");
  labsContainer.innerHTML = "";

  const labCourses = ["SWE 4202", "SWE 4204", "CSE 4206"];

  labCourses.forEach(course => {
    const wrapper = document.createElement("div");
    wrapper.style.margin = "15px 0";

    const label = document.createElement("label");
    label.textContent = `${course} Group: `;
    label.style.marginRight = "10px";

    const select = document.createElement("select");
    select.id = `${course.replace(/\s+/g, '-')}-select`;
    
    ["Not Assigned", "Odd", "Even"].forEach(group => {
      const opt = document.createElement("option");
      opt.value = group;
      opt.textContent = group;
      if (localStorage.getItem(`${course}_group`) === group) {
        opt.selected = true;
      }
      select.appendChild(opt);
    });

    wrapper.appendChild(label);
    wrapper.appendChild(select);
    labsContainer.appendChild(wrapper);
  });
}

function assignGroups() {
  const courses = ["SWE 4202", "SWE 4204", "CSE 4206"];
  courses.forEach(course => {
    const select = document.getElementById(`${course.replace(/\s+/g, '-')}-select`);
    localStorage.setItem(`${course}_group`, select.value);
  });
  showRoutine();
  alert('Lab groups assigned successfully!');
}

function logout() {
  localStorage.removeItem("loggedIn");
  document.getElementById('login-section').style.display = 'block';
  document.getElementById('admin-panel').style.display = 'none';
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark ? "true" : "false");
}

function loadTheme() {
  const dark = localStorage.getItem("darkMode") === "true";
  if (dark) {
    document.body.classList.add("dark");
  }
}

// Initialize
if (localStorage.getItem("loggedIn") === "true") {
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('admin-panel').style.display = 'block';
  renderAdminPanel();
} else {
  document.getElementById('admin-panel').style.display = 'none';
}

loadTheme();
showRoutine();