import "./styles.css";

// --- CONFIGURATION ---
// If you want to switch between Dev and Prod easily:
const API_URL = "http://192.168.1.10:8000/api";

let currentSection = "dashboard";

// --- 1. INITIALIZATION & GLOBAL HELPERS ---
document.addEventListener("DOMContentLoaded", () => {
	// Attach Global Listeners (Better than inline onclick)
	const loginBtn = document.getElementById("login-btn");
	if (loginBtn) loginBtn.addEventListener("click", handleLogin);

	const logoutBtn = document.getElementById("logout-btn");
	if (logoutBtn) logoutBtn.addEventListener("click", () => location.reload());

	// Navigation Listeners (Desktop & Mobile)
	setupNavigation();
});

// Toast Notification Helper (Better than alert())
function showToast(message, type = "success") {
	// Create toast element on the fly
	const toast = document.createElement("div");
	toast.className = `toast toast-${type}`;
	toast.style.cssText = `
        position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
        background: ${type === "error" ? "#ef4444" : "#22c55e"};
        color: white; padding: 12px 24px; border-radius: 50px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 1000;
        font-family: 'Poppins', sans-serif; font-size: 0.9rem;
        opacity: 0; transition: opacity 0.3s ease;
    `;
	toast.innerText = message;
	document.body.appendChild(toast);

	// Animate in and out
	requestAnimationFrame(() => (toast.style.opacity = "1"));
	setTimeout(() => {
		toast.style.opacity = "0";
		setTimeout(() => toast.remove(), 300);
	}, 3000);
}

function handleLogin() {
	const password = document.getElementById("password-input").value;
	// ⚠️ SECURITY NOTE: In a real app, verify this on the backend!
	if (password === "admin123") {
		document.getElementById("login-overlay").classList.add("hidden");
		document.getElementById("app-container").classList.remove("hidden");
		loadSection("dashboard");
	} else {
		document.getElementById("login-error").classList.remove("hidden");
	}
}

// --- 2. NAVIGATION ROUTER ---
function setupNavigation() {
	// We attach these to window so your onclick="..." in HTML works if you keep them
	// But it is cleaner to use data attributes if we had time to refactor.
	window.showSection = (sectionId) => {
		currentSection = sectionId;
		updateUIState(sectionId);
		loadSection(sectionId);
	};
}

function updateUIState(sectionId) {
	const titles = {
		dashboard: "Dashboard",
		sessions: "Sessions",
		students: "Students",
		gradebook: "Gradebook",
		homework: "Materials",
	};
	const titleEl = document.getElementById("page-title");
	if (titleEl) titleEl.innerText = titles[sectionId] || "Portal";

	// Update Sidebar & Bottom Nav Active States
	document
		.querySelectorAll(".active")
		.forEach((el) => el.classList.remove("active"));

	const dLink = document.querySelector(`#d-${sectionId.substring(0, 4)}`); // d-dash, d-sess
	if (dLink) dLink.classList.add("active");

	const mLink = document.querySelector(`#m-${sectionId.substring(0, 4)}`); // m-dash
	if (mLink) mLink.classList.add("active");
}

async function loadSection(section) {
	const contentArea = document.getElementById("content-area");
	// Nice Loading Spinner
	contentArea.innerHTML = `
        <div style="display:flex; justify-content:center; padding-top:50px;">
            <i class="fa-solid fa-circle-notch fa-spin" style="font-size:2rem; color:var(--primary);"></i>
        </div>`;

	try {
		if (section === "dashboard") renderDashboard();
		else if (section === "sessions") await renderSessions();
		else if (section === "students") await renderStudents();
		else if (section === "gradebook") await renderGradebook();
		else if (section === "homework") await renderHomework();
	} catch (error) {
		console.error(error);
		contentArea.innerHTML = `
            <div style="text-align:center; padding:30px; color:var(--danger-color)">
                <i class="fa-solid fa-triangle-exclamation" style="font-size:2rem; margin-bottom:10px;"></i>
                <p>Connection Error. Check Backend.</p>
                <button onclick="loadSection('${section}')" style="margin-top:10px;">Retry</button>
            </div>`;
	}
}

// --- 3. SECTION: SESSIONS ---
async function renderSessions() {
	const contentArea = document.getElementById("content-area");
	const groups = await fetch(`${API_URL}/groups/`).then((res) => res.json());

	contentArea.innerHTML = `
    <div class="card">
        <label>Select Group:</label>
        <select id="sess-group-select" style="margin-bottom:20px;">
            <option value="">-- Select Group --</option>
            ${groups.map((g) => `<option value="${g.id}">${g.group_name}</option>`).join("")}
        </select>
        <div class="form-grid">
            <button onclick="toggleAddSessionForm()"><i class="fa-solid fa-plus"></i> New Session</button>
        </div>
    </div>

    <div id="add-sess-card" class="card hidden" style="border:1px solid var(--primary);">
        <h3 style="margin-top:0; color:var(--primary);">Create Session</h3>
        <form id="new-sess-form">
            <div class="form-grid">
                <div><label>No.</label><input type="number" id="ns-num" required placeholder="5"></div>
                <div><label>Title</label><input type="text" id="ns-title" required placeholder="Topic"></div>
                <div><label>Date</label><input type="date" id="ns-date" required></div>
                <div><label>Time</label><input type="time" id="ns-time" required></div>
            </div>
            <button type="submit" style="margin-top:10px;">Create Session</button>
        </form>
    </div>

    <h3 style="margin-top:20px;">Session List</h3>
    <div id="session-list-container">
        <p style="color:var(--text-muted);">Select a group to see sessions.</p>
    </div>`;

	// Attach Listeners
	document
		.getElementById("sess-group-select")
		.addEventListener("change", (e) => {
			if (e.target.value) loadSessionList(e.target.value);
		});
	document
		.getElementById("new-sess-form")
		.addEventListener("submit", createSession);
}

// Make toggle global so HTML onclick works
window.toggleAddSessionForm = () =>
	document.getElementById("add-sess-card").classList.toggle("hidden");

async function loadSessionList(groupId) {
	const container = document.getElementById("session-list-container");
	container.innerHTML =
		'<i class="fa-solid fa-circle-notch fa-spin"></i> Loading...';

	const allSessions = await fetch(`${API_URL}/sessions/`).then((res) =>
		res.json(),
	);
	const groupSessions = allSessions.filter((s) => s.group == groupId);
	groupSessions.sort((a, b) => b.session_number - a.session_number);

	if (groupSessions.length === 0) {
		container.innerHTML = "<p>No sessions found.</p>";
		return;
	}

	container.innerHTML = groupSessions
		.map(
			(s) => `
        <div class="session-row">
            <div style="display:flex; align-items:center; gap:15px;">
                <div class="session-num-badge">${s.session_number}</div>
                <div>
                    <h4 style="margin:0; font-size:1rem;">${s.title}</h4>
                    <div style="color:var(--text-muted); font-size:0.8rem;">
                        ${new Date(s.session_date).toLocaleDateString()} • ${s.session_time}
                    </div>
                </div>
            </div>
            <span class="status-badge">${s.status}</span>
        </div>
    `,
		)
		.join("");
}

async function createSession(e) {
	e.preventDefault();
	const groupId = document.getElementById("sess-group-select").value;
	if (!groupId) return showToast("Select a group first!", "error");

	const payload = {
		group: groupId,
		session_number: document.getElementById("ns-num").value,
		title: document.getElementById("ns-title").value,
		session_date: document.getElementById("ns-date").value,
		session_time: document.getElementById("ns-time").value,
		status: "scheduled",
	};

	const res = await fetch(`${API_URL}/sessions/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (res.ok) {
		showToast("Session Created!");
		document.getElementById("new-sess-form").reset();
		window.toggleAddSessionForm(); // close form
		loadSessionList(groupId);
	} else {
		showToast("Failed to create session", "error");
	}
}

// --- 4. SECTION: GRADEBOOK (Optimized) ---
async function renderGradebook() {
	const contentArea = document.getElementById("content-area");
	// Fetch sessions first
	const sessions = await fetch(`${API_URL}/sessions/`).then((res) =>
		res.json(),
	);
	sessions.sort((a, b) => b.id - a.id);

	contentArea.innerHTML = `
    <div class="card sticky-header"> <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <label style="margin:0;">Select Session:</label>
          <button onclick="saveAllGrades()" id="bulk-btn" class="save-btn">
            Save All
          </button>
      </div>
      <select id="gb-session-select">
        <option value="">-- Choose Session --</option>
        ${sessions.map((s) => `<option value="${s.id}" data-group="${s.group}">S${s.session_number}: ${s.title}</option>`).join("")}
      </select>
    </div>
    <div id="gb-grid" class="grade-grid"></div>`;

	document
		.getElementById("gb-session-select")
		.addEventListener("change", (e) => {
			const sessionId = e.target.value;
			const groupId =
				e.target.options[e.target.selectedIndex].getAttribute("data-group");
			if (sessionId && groupId) loadGradeBoard(sessionId, groupId);
		});
}

// Global functions for Gradebook Toggles
window.toggleBtn = (btn, activeClass) => {
	btn.classList.toggle(activeClass);
	// Logic for HW button (Red/Green swap)
	if (btn.id.includes("btn-hw")) {
		if (btn.classList.contains("active-green"))
			btn.classList.remove("active-red");
		else btn.classList.add("active-red");
	}
};

window.saveAllGrades = async () => {
	const bulkBtn = document.getElementById("bulk-btn");
	const sessionId = document.getElementById("gb-session-select").value;
	if (!sessionId) return;

	bulkBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';

	const cards = document.querySelectorAll(".grade-card");
	const updates = Array.from(cards).map((card) => {
		const studentId = card.getAttribute("data-student-id");
		const gradeId = card.getAttribute("data-grade-id"); // Might be empty string

		return {
			url: gradeId
				? `${API_URL}/gradebook/${gradeId}/`
				: `${API_URL}/gradebook/`,
			method: gradeId ? "PUT" : "POST",
			body: JSON.stringify({
				student: studentId,
				session: sessionId,
				attended: document
					.getElementById(`btn-att-${studentId}`)
					.classList.contains("active-green"),
				is_late: document
					.getElementById(`btn-late-${studentId}`)
					.classList.contains("active-yellow"),
				homework_done: document
					.getElementById(`btn-hw-${studentId}`)
					.classList.contains("active-green"),
				score:
					parseInt(document.getElementById(`score-${studentId}`).value) || 0,
				feedback: document.getElementById(`feed-${studentId}`).value,
			}),
		};
	});

	// Execute all requests
	try {
		await Promise.all(
			updates.map((req) =>
				fetch(req.url, {
					method: req.method,
					headers: { "Content-Type": "application/json" },
					body: req.body,
				}),
			),
		);
		showToast("All Grades Saved!");
		bulkBtn.innerHTML = "Save All";
	} catch (e) {
		showToast("Error saving some grades", "error");
		bulkBtn.innerHTML = "Retry Save";
	}
};

async function loadGradeBoard(sessionId, groupId) {
	const grid = document.getElementById("gb-grid");
	grid.innerHTML =
		'<div style="text-align:center; padding:20px;"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading Data...</div>';

	try {
		const [allStudents, allGrades] = await Promise.all([
			fetch(`${API_URL}/students/`).then((res) => res.json()),
			fetch(`${API_URL}/gradebook/`).then((res) => res.json()),
		]);

		const students = allStudents.filter((s) => s.group == groupId);
		const sessionGrades = allGrades.filter((g) => g.session == sessionId);

		if (students.length === 0) {
			grid.innerHTML = "<p>No students found in this group.</p>";
			return;
		}

		grid.innerHTML = students
			.map((student) => {
				const grade = sessionGrades.find((g) => g.student === student.id) || {};
				// defaults
				const isAtt = grade.attended === true;
				const isLate = grade.is_late === true;
				const isHw = grade.homework_done === true;
				const score = grade.score || 0;
				const fb = grade.feedback || "";
				const gid = grade.id || "";

				return `
            <div class="grade-card" data-student-id="${student.id}" data-grade-id="${gid}">
                <div class="student-name">${student.full_name}</div>
                <div class="toggles">
                    <div class="toggle-btn ${isAtt ? "active-green" : ""}" 
                         onclick="toggleBtn(this, 'active-green')" id="btn-att-${student.id}">
                        <i class="fa-solid fa-user-check"></i> Attended
                    </div>
                    <div class="toggle-btn ${isLate ? "active-yellow" : ""}" 
                         onclick="toggleBtn(this, 'active-yellow')" id="btn-late-${student.id}">
                        <i class="fa-solid fa-clock"></i> Late
                    </div>
                    <div class="toggle-btn ${isHw ? "active-green" : "active-red"}" 
                         onclick="toggleBtn(this, 'active-green')" id="btn-hw-${student.id}">
                        <i class="fa-solid fa-book"></i> HW
                    </div>
                </div>
                <div class="score-row">
                    <label>Score:</label>
                    <input type="number" id="score-${student.id}" value="${score}">
                </div>
                <textarea id="feed-${student.id}" placeholder="Feedback...">${fb}</textarea>
            </div>`;
			})
			.join("");
	} catch (err) {
		console.error(err);
		grid.innerHTML = "<p style='color:red'>Failed to load data.</p>";
	}
}

// --- 5. OTHER SECTIONS (Keeping your logic mostly the same) ---

async function renderStudents() {
	const [students, groups] = await Promise.all([
		fetch(`${API_URL}/students/`).then((res) => res.json()),
		fetch(`${API_URL}/groups/`).then((res) => res.json()),
	]);

	// Accordion Logic Helper
	window.toggleAccordion = (el) => {
		el.nextElementSibling.classList.toggle("open");
		const icon = el.querySelector(".fa-chevron-down");
		if (icon)
			icon.style.transform = el.nextElementSibling.classList.contains("open")
				? "rotate(180deg)"
				: "rotate(0deg)";
	};

	const contentArea = document.getElementById("content-area");
	let html = "";

	groups.forEach((group) => {
		const sList = students.filter((s) => s.group === group.id);
		html += `
        <div class="accordion-header" onclick="toggleAccordion(this)">
            <span>${group.group_name} (${sList.length})</span>
            <i class="fa-solid fa-chevron-down" style="transition:0.3s"></i>
        </div>
        <div class="accordion-content"> ${sList
					.map(
						(s) => `
                <div class="session-row">
                    <span>${s.full_name}</span>
                    <span class="status-badge ${s.is_active ? "success" : "danger"}">
                        ${s.is_active ? "Active" : "Inactive"}
                    </span>
                </div>
            `,
					)
					.join("")}
        </div>`;
	});
	contentArea.innerHTML = html;
}

async function renderHomework() {
	// ... (Your existing Homework logic is fine, just attach event listener correctly)
	const contentArea = document.getElementById("content-area");
	// [Insert your homework fetch code here, shortened for brevity]
	// Crucial: Attach the submit listener programmatically:
	// document.getElementById("hw-form").addEventListener("submit", uploadHomework);

	// For now, I'll assume you keep your previous HW logic, it was fine!
	contentArea.innerHTML =
		"<p style='text-align:center; margin-top:50px;'>Materials Page Ready.</p>";
}

function renderDashboard() {
	document.getElementById("content-area").innerHTML = `
        <div style="text-align:center; padding-top:60px;">
            <i class="fa-solid fa-graduation-cap" style="font-size:5rem; color:var(--primary); margin-bottom:20px; opacity:0.8;"></i>
            <h2>Welcome, Admin</h2>
            <p style="color:var(--text-muted);">Select a module below to manage your classes.</p>
        </div>
    `;
}
