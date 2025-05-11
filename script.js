const routineData = [
  { time: "08:00 – 09:15", entries: [{}, {}, {}, {}, {}] },
  { time: "09:15 – 10:30", entries: [
    { course: "Hum 4249", teacher: "FM", room: "R106" },
    { course: "CSE 4205", teacher: "AAR", room: "R106" },
    { course: "SWE 4202", teacher: "JN / MNR", room: "L-1" },
    { course: "CSE 4205", teacher: "AAR", room: "R105" },
    { course: "Hum 4249", teacher: "FM", room: "R105" }
  ]},
  { time: "10:30 – 11:45", entries: [
    { course: "Math 4241", teacher: "AKA", room: "R106" },
    { course: "SWE 4201", teacher: "JN", room: "R106" },
    {}, 
    { course: "CSE 4203", teacher: "AZM", room: "R105" },
    { course: "Hum 4247", teacher: "TAH", room: "R105" }
  ]},
  { time: "11:45 – 13:00", entries: [
    {}, 
    { course: "SWE 4202", teacher: "JN / MNR", room: "L-2" },
    { course: "Hum 4242", teacher: "ARMK", room: "R-304" },
    { course: "Math 4241", teacher: "AKA", room: "R105" },
    { course: "CSE 4203", teacher: "AZM", room: "R106" }
  ]},
  { time: "13:00 – 14:30", entries: [
    { course: "Break" }, { course: "Break" }, { course: "Break" }, { course: "Break" }, { course: "Break" }
  ]},
  { time: "14:30 – 15:45", entries: [
    { course: "CSE 4206", teacher: "THS", room: "L-1" },
    { course: "CSE 4206", teacher: "THS", room: "L-1" },
    {}, 
    {}, 
    {}
  ]},
  { time: "15:45 – 17:00", entries: [
    {}, 
    { course: "Hum 4247", teacher: "TAH", room: "R106" },
    {}, 
    { course: "SWE 4201", teacher: "JN", room: "R105" },
    {}
  ]}
];

// Check if course is lab
function isLab(course) {
  return /\d+[02468]$/.test(course) && course !== "Hum 4242";
}

// Renders table
function showRoutine() {
  const tbody = document.getElementById("routine-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";

  routineData.forEach(row => {
    const tr = document.createElement("tr");
    const timeTd = document.createElement("td");
    timeTd.textContent = row.time;
    tr.appendChild(timeTd);

    row.entries.forEach(entry => {
      const td = document.createElement("td");
      if (entry.course) {
        let courseDisplay = `<strong>${entry.course}</strong><br>`;
        if (entry.teacher) courseDisplay += `${entry.teacher}<br>`;
        if (entry.room) courseDisplay += `Room: ${entry.room}<br>`;

        if (isLab(entry.course)) {
          const group = localStorage.getItem(`${entry.course}_group`) || "Not Assigned";
          courseDisplay += `<em>Group: ${group}</em>`;
        }

        td.innerHTML = courseDisplay;
      }
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
}

// Login
function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if (user === 'admin' && pass === 'admin') {
    localStorage.setItem('loggedIn', 'true');
    window.location.href = 'admin.html';
  } else {
    alert('Invalid credentials');
  }
}

// Admin Page Logic
function renderAdminPanel() {
  if (!window.location.pathname.includes("admin.html")) return;
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
    return;
  }

  const labsContainer = document.getElementById("labs");
  const labCourses = new Set();

  routineData.forEach(row => {
    row.entries.forEach(entry => {
      if (entry.course && isLab(entry.course)) {
        labCourses.add(entry.course);
      }
    });
  });

  labCourses.forEach(course => {
    const wrapper = document.createElement("div");
    wrapper.style.margin = "10px 0";

    const label = document.createElement("label");
    label.textContent = `${course} Group: `;

    const select = document.createElement("select");
    ["Odd", "Even"].forEach(group => {
      const opt = document.createElement("option");
      opt.value = group;
      opt.textContent = group;
      if (localStorage.getItem(`${course}_group`) === group) {
        opt.selected = true;
      }
      select.appendChild(opt);
    });

    select.onchange = () => {
      localStorage.setItem(`${course}_group`, select.value);
    };

    wrapper.appendChild(label);
    wrapper.appendChild(select);
    labsContainer.appendChild(wrapper);
  });
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

showRoutine();
renderAdminPanel();


// Theme toggle
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

loadTheme();
