// API Configuration
const API_BASE_URL = "http://127.0.0.1:8000/api";
const CORRECT_PASSWORD = "mr_lol_12";
const REQUEST_TIMEOUT = 8000; // 8 second timeout

// Cache for loaded data
const dataCache = {
	groups: null,
	students: null,
	sessions: null,
	gradebook: null,
};

// Track which views have been loaded
const loadedViews = new Set();

// DOM Elements
const loginOverlay = document.getElementById("loginOverlay");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");
const errorMessage = document.getElementById("errorMessage");
const dashboard = document.getElementById("dashboard");
const logoutBtn = document.getElementById("logoutBtn");
const navItems = document.querySelectorAll(".nav-item");
const contentViews = document.querySelectorAll(".content-view");

// Login Functionality
function handleLogin() {
	const password = passwordInput.value.trim();

	if (password === CORRECT_PASSWORD) {
		errorMessage.textContent = "";
		loginOverlay.classList.add("fade-out");
		setTimeout(() => {
			loginOverlay.style.display = "none";
			dashboard.classList.remove("hidden");
			loadInitialData();
		}, 500);
	} else {
		errorMessage.textContent = "Incorrect password. Please try again.";
		passwordInput.classList.add("shake");
		passwordInput.value = "";
		passwordInput.style.borderColor = "var(--error-color)";

		setTimeout(() => {
			passwordInput.classList.remove("shake");
			passwordInput.style.borderColor = "";
		}, 500);
	}
}

loginBtn.addEventListener("click", handleLogin);
passwordInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		handleLogin();
	}
});

// Logout Functionality
logoutBtn.addEventListener("click", () => {
	dashboard.classList.add("hidden");
	loginOverlay.style.display = "flex";
	loginOverlay.classList.remove("fade-out");
	passwordInput.value = "";
	errorMessage.textContent = "";
});

// Navigation
navItems.forEach((item) => {
	item.addEventListener("click", () => {
		const viewName = item.dataset.view;

		// Update active nav item
		navItems.forEach((nav) => nav.classList.remove("active"));
		item.classList.add("active");

		// Update active view
		contentViews.forEach((view) => view.classList.remove("active"));
		document.getElementById(`${viewName}View`).classList.add("active");

		// Load data for the selected view
		loadViewData(viewName);
	});
});

// API Fetch Helper
async function fetchAPI(endpoint, options = {}) {
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

		const response = await fetch(`${API_BASE_URL}${endpoint}`, {
			headers: {
				"Content-Type": "application/json",
				...options.headers,
			},
			signal: controller.signal,
			...options,
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("API Error:", error);
		throw error;
	}
}

// Load Initial Data - only load groups on first load
function loadInitialData() {
	if (!loadedViews.has("groups")) {
		loadGroups();
		loadedViews.add("groups");
	}
}

// Load View Data - lazy load only when needed
function loadViewData(viewName) {
	if (loadedViews.has(viewName)) {
		return; // Already loaded, skip API call
	}

	loadedViews.add(viewName);

	switch (viewName) {
		case "groups":
			loadGroups();
			break;
		case "students":
			loadStudents();
			break;
		case "sessions":
			loadSessions();
			break;
		case "gradebook":
			loadGradebook();
			break;
	}
}

// Load Groups
async function loadGroups() {
	const groupsList = document.getElementById("groupsList");
	groupsList.innerHTML = '<div class="loading">Loading groups...</div>';

	try {
		const groups = await fetchAPI("/groups/");

		if (groups.length === 0) {
			groupsList.innerHTML = '<div class="loading">No groups found.</div>';
			return;
		}

		groupsList.innerHTML = groups
			.map(
				(group) => `
            <div class="data-card glass-card">
                <h3>${group.group_name || "Unnamed Group"}</h3>
                <p><span class="label">ID:</span> ${group.id}</p>
                <p><span class="label">Time:</span> ${group.group_time || "N/A"}</p>
                <p><span class="label">Start Date:</span> ${formatDate(group.group_start_date)}</p>
                <p><span class="label">Sessions:</span> ${group.group_session_count || 0}</p>
                <p><span class="label">Status:</span> ${group.group_is_active ? "Active" : "Inactive"}</p>
                <div class="card-actions">
                    <button class="btn-edit" onclick="editGroup(${group.id})">✏️ Edit</button>
                    <button class="btn-delete" onclick="confirmDeleteGroup(${group.id})">🗑️ Delete</button>
                </div>
            </div>
        `,
			)
			.join("");
	} catch (error) {
		groupsList.innerHTML =
			'<div class="loading">Error loading groups. Please check if the API is running.</div>';
	}
}

// Load Students
async function loadStudents() {
	const studentsList = document.getElementById("studentsList");
	studentsList.innerHTML = '<div class="loading">Loading students...</div>';

	try {
		const students = await fetchAPI("/students/");

		if (students.length === 0) {
			studentsList.innerHTML = '<div class="loading">No students found.</div>';
			return;
		}

		studentsList.innerHTML = students
			.map(
				(student) => `
            <div class="data-card glass-card">
                <h3>${student.full_name || "Unnamed Student"}</h3>
                <p><span class="label">ID:</span> ${student.id}</p>
                <p><span class="label">Age:</span> ${student.age || "N/A"}</p>
                <p><span class="label">Total Grade:</span> ${student.total_grade || 0}</p>
                <p><span class="label">Group ID:</span> ${student.group || "No group"}</p>
                <div class="card-actions">
                    <button class="btn-edit" onclick="editStudent(${student.id})">✏️ Edit</button>
                    <button class="btn-delete" onclick="confirmDeleteStudent(${student.id})">🗑️ Delete</button>
                </div>
            </div>
        `,
			)
			.join("");
	} catch (error) {
		studentsList.innerHTML =
			'<div class="loading">Error loading students. Please check if the API is running.</div>';
	}
}

// Load Sessions
async function loadSessions() {
	const sessionsList = document.getElementById("sessionsList");
	sessionsList.innerHTML = '<div class="loading">Loading sessions...</div>';

	try {
		const sessions = await fetchAPI("/sessions/");

		if (sessions.length === 0) {
			sessionsList.innerHTML = '<div class="loading">No sessions found.</div>';
			return;
		}

		sessionsList.innerHTML = sessions
			.map(
				(session) => `
            <div class="data-card glass-card">
                <h3>${session.title || "Unnamed Session"}</h3>
                <p><span class="label">ID:</span> ${session.id}</p>
                <p><span class="label">Session #:</span> ${session.session_number}</p>
                <p><span class="label">Date:</span> ${formatDate(session.session_date)}</p>
                <p><span class="label">Time:</span> ${session.session_time || "N/A"}</p>
                <p><span class="label">Status:</span> ${session.status || "Scheduled"}</p>
                <p><span class="label">Homework Info:</span> ${session.homework_info || "No info"}</p>
                <div class="card-actions">
                    <button class="btn-edit" onclick="editSession(${session.id})">✏️ Edit</button>
                    <button class="btn-delete" onclick="confirmDeleteSession(${session.id})">🗑️ Delete</button>
                </div>
            </div>
        `,
			)
			.join("");
	} catch (error) {
		sessionsList.innerHTML =
			'<div class="loading">Error loading sessions. Please check if the API is running.</div>';
	}
}

// Load Gradebook
async function loadGradebook() {
	const gradebookList = document.getElementById("gradebookList");
	gradebookList.innerHTML = '<div class="loading">Loading gradebook...</div>';

	try {
		const gradebook = await fetchAPI("/gradebook/");

		if (gradebook.length === 0) {
			gradebookList.innerHTML =
				'<div class="loading">No gradebook entries found.</div>';
			return;
		}

		// Group data: Group -> Session -> Students
		const groupedData = gradebook.reduce((acc, entry) => {
			const groupName = entry.group_name || "Unknown Group";
			const sessionNum = entry.session_number || 0;
			const sessionTitle = entry.session_title || "Unknown";

			if (!acc[groupName]) {
				acc[groupName] = {};
			}
			if (!acc[groupName][sessionNum]) {
				acc[groupName][sessionNum] = {
					title: sessionTitle,
					students: [],
				};
			}
			acc[groupName][sessionNum].students.push(entry);
			return acc;
		}, {});

		// Render accordions for each group
		gradebookList.innerHTML = Object.entries(groupedData)
			.map(([groupName, sessions], groupIndex) => {
				const sessionKeys = Object.keys(sessions)
					.map(Number)
					.sort((a, b) => a - b);

				return `
					<div class="gradebook-group glass-card">
						<button class="accordion-header" data-group="${groupIndex}">
							<span class="accordion-icon">▶</span>
							<h3 class="gradebook-group-title">${groupName}</h3>
						</button>
						<div class="accordion-content">
							${sessionKeys
								.map((sessionNum) => {
									const session = sessions[sessionNum];
									return `
										<div class="session-container">
											<h4 class="session-header">Session ${sessionNum}: ${session.title}</h4>
											<div class="table-wrapper">
												<table class="gradebook-table">
													<thead>
														<tr>
															<th>Student Name</th>
															<th>Attended</th>
															<th>Late</th>
															<th>Lost Conn</th>
															<th>Score</th>
															<th>Homework Done</th>
															<th>Notes/Feedback</th>
														</tr>
													</thead>
													<tbody>
														${session.students
															.map(
																(entry) => `
																	<tr>
																		<td>${entry.student_name || "Unknown"}</td>
																		<td class="checkbox-cell"><input type="checkbox" disabled ${entry.attended ? "checked" : ""}></td>
																		<td class="checkbox-cell"><input type="checkbox" disabled ${entry.is_late ? "checked" : ""}></td>
																		<td class="checkbox-cell"><input type="checkbox" disabled ${entry.lost_connection ? "checked" : ""}></td>
																		<td>${entry.score ?? "—"}</td>
																		<td class="checkbox-cell"><input type="checkbox" disabled ${entry.homework_done ? "checked" : ""}></td>
																		<td><small>${entry.improvment_note || entry.feedback || "—"}</small></td>
																	</tr>
																`,
															)
															.join("")}
													</tbody>
												</table>
											</div>
										</div>
									`;
								})
								.join("")}
						</div>
					</div>
				`;
			})
			.join("");

		// Attach event listeners after rendering
		document.querySelectorAll(".accordion-header").forEach((header) => {
			header.addEventListener("click", function (e) {
				e.preventDefault();
				toggleAccordion(this);
			});
		});
	} catch (error) {
		gradebookList.innerHTML =
			'<div class="loading">Error loading gradebook. Please check if the API is running.</div>';
	}
}

// Toggle accordion open/close
function toggleAccordion(button) {
	const content = button.nextElementSibling;
	const icon = button.querySelector(".accordion-icon");

	if (content.classList.contains("show")) {
		content.classList.remove("show");
		icon.style.transform = "rotate(0deg)";
	} else {
		content.classList.add("show");
		icon.style.transform = "rotate(90deg)";
	}
}

// HOMEWORK UPLOAD
document.getElementById("uploadHomeworkBtn").addEventListener("click", () => {
	document.getElementById("homeworkFileInput").click();
});

document
	.getElementById("homeworkFileInput")
	.addEventListener("change", async function () {
		const files = this.files;
		const title = document.getElementById("homeworkTitle").value;
		const description = document.getElementById("homeworkDescription").value;

		if (files.length === 0) {
			showStatus("Please select at least one image file.", "error");
			return;
		}

		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);

		// Append all selected files
		for (let i = 0; i < files.length; i++) {
			formData.append("images", files[i]);
		}

		try {
			showStatus("Uploading...", "success");

			const response = await fetch(`${API_BASE_URL}/homework-materials/`, {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Upload failed");
			}

			const result = await response.json();
			showStatus("Homework uploaded successfully!", "success");
			homeworkForm.reset();

			// Optionally reload sessions to show updated data
			setTimeout(() => {
				loadSessions();
			}, 1500);
		} catch (error) {
			showStatus("Error uploading homework. Please try again.", "error");
			console.error("Upload error:", error);
		}
	});

function showStatus(message, type) {
	uploadStatus.textContent = message;
	uploadStatus.className = `status-message ${type}`;

	if (type === "success") {
		setTimeout(() => {
			uploadStatus.textContent = "";
			uploadStatus.className = "status-message";
		}, 3000);
	}
}

// Refresh Buttons - clear cache and force reload
document.getElementById("refreshGroups").addEventListener("click", () => {
	dataCache.groups = null;
	loadGroups();
});
document.getElementById("refreshStudents").addEventListener("click", () => {
	dataCache.students = null;
	loadStudents();
});
document.getElementById("refreshSessions").addEventListener("click", () => {
	dataCache.sessions = null;
	loadSessions();
});
document.getElementById("refreshGradebook").addEventListener("click", () => {
	dataCache.gradebook = null;
	loadGradebook();
});

// Utility Functions
function formatDate(dateString) {
	if (!dateString) return "N/A";

	try {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	} catch (error) {
		return dateString;
	}
}

// =============================================================================
// CRUD FORM HANDLERS
// =============================================================================

// GROUP CRUD
document.getElementById("addGroupBtn").addEventListener("click", () => {
	document.getElementById("groupModalTitle").textContent = "Add Group";
	document.getElementById("groupForm").reset();
	document.getElementById("groupId").value = "";
	document.getElementById("groupIsActive").checked = true;
	openModal("groupModal");
});

document.getElementById("groupForm").addEventListener("submit", async (e) => {
	e.preventDefault();

	const groupId = document.getElementById("groupId").value;
	const data = {
		group_name: document.getElementById("groupName").value,
		group_day: parseInt(document.getElementById("groupDay").value),
		group_time: document.getElementById("groupTime").value,
		group_start_date: document.getElementById("groupStartDate").value,
		group_session_count: parseInt(
			document.getElementById("groupSessionCount").value,
		),
		group_is_active: document.getElementById("groupIsActive").checked,
		group_is_completed: document.getElementById("groupIsCompleted").checked,
	};

	try {
		if (groupId) {
			await updateGroup(groupId, data);
		} else {
			await createGroup(data);
		}
		closeModal("groupModal");
		dataCache.groups = null;
		loadedViews.delete("groups");
		loadGroups();
	} catch (error) {
		alert("Error saving group: " + error.message);
	}
});

async function editGroup(id) {
	try {
		const group = await fetchAPI(`/groups/${id}/`);
		document.getElementById("groupModalTitle").textContent = "Edit Group";
		document.getElementById("groupId").value = group.id;
		document.getElementById("groupName").value = group.group_name;
		document.getElementById("groupDay").value = group.group_day;
		document.getElementById("groupTime").value = group.group_time;
		document.getElementById("groupStartDate").value = group.group_start_date;
		document.getElementById("groupSessionCount").value =
			group.group_session_count;
		document.getElementById("groupIsActive").checked = group.group_is_active;
		document.getElementById("groupIsCompleted").checked =
			group.group_is_completed;
		openModal("groupModal");
	} catch (error) {
		alert("Error loading group: " + error.message);
	}
}

async function confirmDeleteGroup(id) {
	if (confirm("Are you sure you want to delete this group?")) {
		try {
			await deleteGroup(id);
			dataCache.groups = null;
			loadedViews.delete("groups");
			loadGroups();
		} catch (error) {
			alert("Error deleting group: " + error.message);
		}
	}
}

// STUDENT CRUD
document.getElementById("addStudentBtn").addEventListener("click", async () => {
	document.getElementById("studentModalTitle").textContent = "Add Student";
	document.getElementById("studentForm").reset();
	document.getElementById("studentId").value = "";
	await populateGroupDropdown("studentGroup");
	openModal("studentModal");
});

document.getElementById("studentForm").addEventListener("submit", async (e) => {
	e.preventDefault();

	const studentId = document.getElementById("studentId").value;
	const data = {
		full_name: document.getElementById("studentName").value,
		age: parseInt(document.getElementById("studentAge").value),
		group: parseInt(document.getElementById("studentGroup").value),
		total_grade: parseInt(document.getElementById("studentTotalGrade").value),
	};

	try {
		if (studentId) {
			await updateStudent(studentId, data);
		} else {
			await createStudent(data);
		}
		closeModal("studentModal");
		dataCache.students = null;
		loadedViews.delete("students");
		loadStudents();
	} catch (error) {
		alert("Error saving student: " + error.message);
	}
});

async function editStudent(id) {
	try {
		const student = await fetchAPI(`/students/${id}/`);
		document.getElementById("studentModalTitle").textContent = "Edit Student";
		document.getElementById("studentId").value = student.id;
		document.getElementById("studentName").value = student.full_name;
		document.getElementById("studentAge").value = student.age;
		document.getElementById("studentTotalGrade").value = student.total_grade;
		await populateGroupDropdown("studentGroup");
		document.getElementById("studentGroup").value = student.group;
		openModal("studentModal");
	} catch (error) {
		alert("Error loading student: " + error.message);
	}
}

async function confirmDeleteStudent(id) {
	if (confirm("Are you sure you want to delete this student?")) {
		try {
			await deleteStudent(id);
			dataCache.students = null;
			loadedViews.delete("students");
			loadStudents();
		} catch (error) {
			alert("Error deleting student: " + error.message);
		}
	}
}

// SESSION CRUD
document.getElementById("addSessionBtn").addEventListener("click", async () => {
	document.getElementById("sessionModalTitle").textContent = "Add Session";
	document.getElementById("sessionForm").reset();
	document.getElementById("sessionId").value = "";
	await populateGroupDropdown("sessionGroup");
	openModal("sessionModal");
});

document.getElementById("sessionForm").addEventListener("submit", async (e) => {
	e.preventDefault();

	const sessionId = document.getElementById("sessionId").value;
	const data = {
		group: parseInt(document.getElementById("sessionGroup").value),
		session_number: parseInt(document.getElementById("sessionNumber").value),
		title: document.getElementById("sessionTitle").value,
		session_date: document.getElementById("sessionDate").value,
		session_time: document.getElementById("sessionTime").value,
		status: document.getElementById("sessionStatus").value,
		homework_info: document.getElementById("sessionHomework").value,
		is_reviewed: document.getElementById("sessionReviewed").checked,
	};

	try {
		if (sessionId) {
			await updateSession(sessionId, data);
		} else {
			await createSession(data);
		}
		closeModal("sessionModal");
		dataCache.sessions = null;
		loadedViews.delete("sessions");
		loadSessions();
	} catch (error) {
		alert("Error saving session: " + error.message);
	}
});

async function editSession(id) {
	try {
		const session = await fetchAPI(`/sessions/${id}/`);
		document.getElementById("sessionModalTitle").textContent = "Edit Session";
		document.getElementById("sessionId").value = session.id;
		document.getElementById("sessionNumber").value = session.session_number;
		document.getElementById("sessionTitle").value = session.title;
		document.getElementById("sessionDate").value = session.session_date;
		document.getElementById("sessionTime").value = session.session_time;
		document.getElementById("sessionStatus").value = session.status;
		document.getElementById("sessionHomework").value = session.homework_info;
		document.getElementById("sessionReviewed").checked = session.is_reviewed;
		await populateGroupDropdown("sessionGroup");
		document.getElementById("sessionGroup").value = session.group;
		openModal("sessionModal");
	} catch (error) {
		alert("Error loading session: " + error.message);
	}
}

async function confirmDeleteSession(id) {
	if (confirm("Are you sure you want to delete this session?")) {
		try {
			await deleteSession(id);
			dataCache.sessions = null;
			loadedViews.delete("sessions");
			loadSessions();
		} catch (error) {
			alert("Error deleting session: " + error.message);
		}
	}
}

// GRADEBOOK CRUD
document
	.getElementById("addGradebookBtn")
	.addEventListener("click", async () => {
		document.getElementById("gradebookModalTitle").textContent =
			"Add Gradebook Entry";
		document.getElementById("gradebookForm").reset();
		document.getElementById("gradebookId").value = "";
		await populateStudentDropdown("gradebookStudent");
		await populateSessionDropdown("gradebookSession");
		openModal("gradebookModal");
	});

document
	.getElementById("gradebookForm")
	.addEventListener("submit", async (e) => {
		e.preventDefault();

		const gradebookId = document.getElementById("gradebookId").value;
		const data = {
			student: parseInt(document.getElementById("gradebookStudent").value),
			session: parseInt(document.getElementById("gradebookSession").value),
			score: parseInt(document.getElementById("gradebookScore").value),
			attended: document.getElementById("gradebookAttended").checked,
			is_late: document.getElementById("gradebookLate").checked,
			lost_connection: document.getElementById("gradebookLostConnection")
				.checked,
			homework_done: document.getElementById("gradebookHomeworkDone").checked,
			improvment_note: document.getElementById("gradebookNote").value,
			feedback: document.getElementById("gradebookFeedback").value,
		};

		try {
			if (gradebookId) {
				await updateGradebook(gradebookId, data);
			} else {
				await createGradebook(data);
			}
			closeModal("gradebookModal");
			dataCache.gradebook = null;
			loadedViews.delete("gradebook");
			loadGradebook();
		} catch (error) {
			alert("Error saving gradebook entry: " + error.message);
		}
	});

async function editGradebook(id) {
	try {
		const entry = await fetchAPI(`/gradebook/${id}/`);
		document.getElementById("gradebookModalTitle").textContent =
			"Edit Gradebook Entry";
		document.getElementById("gradebookId").value = entry.id;
		document.getElementById("gradebookScore").value = entry.score;
		document.getElementById("gradebookAttended").checked = entry.attended;
		document.getElementById("gradebookLate").checked = entry.is_late;
		document.getElementById("gradebookLostConnection").checked =
			entry.lost_connection;
		document.getElementById("gradebookHomeworkDone").checked =
			entry.homework_done;
		document.getElementById("gradebookNote").value = entry.improvment_note;
		document.getElementById("gradebookFeedback").value = entry.feedback;
		await populateStudentDropdown("gradebookStudent");
		await populateSessionDropdown("gradebookSession");
		document.getElementById("gradebookStudent").value = entry.student;
		document.getElementById("gradebookSession").value = entry.session;
		openModal("gradebookModal");
	} catch (error) {
		alert("Error loading gradebook entry: " + error.message);
	}
}

async function confirmDeleteGradebook(id) {
	if (confirm("Are you sure you want to delete this gradebook entry?")) {
		try {
			await deleteGradebook(id);
			dataCache.gradebook = null;
			loadedViews.delete("gradebook");
			loadGradebook();
		} catch (error) {
			alert("Error deleting gradebook entry: " + error.message);
		}
	}
}
