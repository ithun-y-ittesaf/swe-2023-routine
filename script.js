const routineData = [
  { day: "Monday", entries: [
    { time: "09:15 – 10:30", course: "Hum 4249", teacher: "FM", room: "R106" },
    { time: "10:30 – 11:45", course: "CSE 4205", teacher: "AAR", room: "R106" },
    { time: "11:45 – 13:00", course: "SWE 4202", teacher: "JN / MNR", room: "L-1" },
    { time: "13:00 – 14:30", course: "Break" },
    { time: "14:30 – 15:45", course: "CSE 4206", teacher: "THS", room: "L-1" },
    { time: "15:45 – 17:00", course: "Hum 4247", teacher: "TAH", room: "R106" }
  ]},
  { day: "Tuesday", entries: [
    { time: "08:00 – 09:15", course: "CSE 4205", teacher: "AAR", room: "R106" },
    { time: "09:15 – 10:30", course: "SWE 4202", teacher: "JN / MNR", room: "L-1" },
    { time: "10:30 – 11:45", course: "Math 4241", teacher: "AKA", room: "R106" },
    { time: "11:45 – 13:00", course: "Hum 4242", teacher: "ARMK", room: "R-304" },
    { time: "13:00 – 14:30", course: "Break" },
    { time: "14:30 – 15:45", course: "CSE 4206", teacher: "THS", room: "L-1" }
  ]},
  { day: "Wednesday", entries: [
    { time: "08:00 – 09:15", course: "SWE 4201", teacher: "JN", room: "R106" },
    { time: "09:15 – 10:30", course: "CSE 4205", teacher: "AAR", room: "R105" },
    { time: "10:30 – 11:45", course: "CSE 4203", teacher: "AZM", room: "R105" },
    { time: "11:45 – 13:00", course: "Math 4241", teacher: "AKA", room: "R105" },
    { time: "13:00 – 14:30", course: "Break" },
    { time: "15:45 – 17:00", course: "SWE 4201", teacher: "JN", room: "R105" }
  ]},
  { day: "Thursday", entries: [
    { time: "08:00 – 09:15", course: "Hum 4249", teacher: "FM", room: "R105" },
    { time: "09:15 – 10:30", course: "Hum 4249", teacher: "FM", room: "R106" },
    { time: "10:30 – 11:45", course: "Hum 4247", teacher: "TAH", room: "R105" },
    { time: "11:45 – 13:00", course: "CSE 4203", teacher: "AZM", room: "R106" },
    { time: "13:00 – 14:30", course: "Break" }
  ]},
  { day: "Friday", entries: [
    { time: "08:00 – 09:15", course: "SWE 4202", teacher: "JN / MNR", room: "L-2" },
    { time: "09:15 – 10:30", course: "CSE 4205", teacher: "AAR", room: "R106" },
    { time: "10:30 – 11:45", course: "Math 4241", teacher: "AKA", room: "R106" },
    { time: "11:45 – 13:00", course: "Hum 4242", teacher: "ARMK", room: "R-304" },
    { time: "13:00 – 14:30", course: "Break" }
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

  const times = [
    "08:00 – 09:15",
    "09:15 – 10:30",
    "10:30 – 11:45",
    "11:45 – 13:00",
    "13:00 – 14:30",
    "14:30 – 15:45",
    "15:45 – 17:00"
  ];

  routineData.forEach(row => {
    const tr = document.createElement("tr");
    const dayTd = document.createElement("td");
    dayTd.textContent = row.day;
    tr.appendChild(dayTd);

    times.forEach(time => {
      const td = document.createElement("td");
      const entry = row.entries.find(e => e.time === time);

      if (entry) {
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

showRoutine();
