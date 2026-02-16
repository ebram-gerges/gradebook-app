// CRUD Operations Module

// =============================================================================
// GROUPS CRUD
// =============================================================================

async function createGroup(data) {
	try {
		const response = await fetch(`${API_BASE_URL}/groups/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!response.ok) throw new Error("Failed to create group");
		return await response.json();
	} catch (error) {
		console.error("Create group error:", error);
		throw error;
	}
}

async function updateGroup(id, data) {
	try {
		const response = await fetch(`${API_BASE_URL}/groups/${id}/`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!response.ok) throw new Error("Failed to update group");
		return await response.json();
	} catch (error) {
		console.error("Update group error:", error);
		throw error;
	}
}

async function deleteGroup(id) {
	try {
		const response = await fetch(`${API_BASE_URL}/groups/${id}/`, {
			method: "DELETE",
		});
		if (!response.ok) throw new Error("Failed to delete group");
		return true;
	} catch (error) {
		console.error("Delete group error:", error);
		throw error;
	}
}

// =============================================================================
// STUDENTS CRUD
// =============================================================================

async function createStudent(data) {
	try {
		const response = await fetch(`${API_BASE_URL}/students/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!response.ok) throw new Error("Failed to create student");
		return await response.json();
	} catch (error) {
		console.error("Create student error:", error);
		throw error;
	}
}

async function updateStudent(id, data) {
	try {
		const response = await fetch(`${API_BASE_URL}/students/${id}/`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!response.ok) throw new Error("Failed to update student");
		return await response.json();
	} catch (error) {
		console.error("Update student error:", error);
		throw error;
	}
}

async function deleteStudent(id) {
	try {
		const response = await fetch(`${API_BASE_URL}/students/${id}/`, {
			method: "DELETE",
		});
		if (!response.ok) throw new Error("Failed to delete student");
		return true;
	} catch (error) {
		console.error("Delete student error:", error);
		throw error;
	}
}

// =============================================================================
// SESSIONS CRUD
// =============================================================================

async function createSession(data) {
	try {
		const response = await fetch(`${API_BASE_URL}/sessions/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!response.ok) throw new Error("Failed to create session");
		return await response.json();
	} catch (error) {
		console.error("Create session error:", error);
		throw error;
	}
}

async function updateSession(id, data) {
	try {
		const response = await fetch(`${API_BASE_URL}/sessions/${id}/`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!response.ok) throw new Error("Failed to update session");
		return await response.json();
	} catch (error) {
		console.error("Update session error:", error);
		throw error;
	}
}

async function deleteSession(id) {
	try {
		const response = await fetch(`${API_BASE_URL}/sessions/${id}/`, {
			method: "DELETE",
		});
		if (!response.ok) throw new Error("Failed to delete session");
		return true;
	} catch (error) {
		console.error("Delete session error:", error);
		throw error;
	}
}

// =============================================================================
// GRADEBOOK CRUD
// =============================================================================

async function createGradebook(data) {
	try {
		const response = await fetch(`${API_BASE_URL}/gradebook/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!response.ok) throw new Error("Failed to create gradebook entry");
		return await response.json();
	} catch (error) {
		console.error("Create gradebook error:", error);
		throw error;
	}
}

async function updateGradebook(id, data) {
	try {
		const response = await fetch(`${API_BASE_URL}/gradebook/${id}/`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		if (!response.ok) throw new Error("Failed to update gradebook entry");
		return await response.json();
	} catch (error) {
		console.error("Update gradebook error:", error);
		throw error;
	}
}

async function deleteGradebook(id) {
	try {
		const response = await fetch(`${API_BASE_URL}/gradebook/${id}/`, {
			method: "DELETE",
		});
		if (!response.ok) throw new Error("Failed to delete gradebook entry");
		return true;
	} catch (error) {
		console.error("Delete gradebook error:", error);
		throw error;
	}
}

// =============================================================================
// MODAL MANAGEMENT
// =============================================================================

function openModal(modalId) {
	const modal = document.getElementById(modalId);
	if (modal) {
		modal.style.display = "flex";
		modal.classList.add("modal-show");
	}
}

function closeModal(modalId) {
	const modal = document.getElementById(modalId);
	if (modal) {
		modal.classList.remove("modal-show");
		setTimeout(() => {
			modal.style.display = "none";
		}, 300);
	}
}

function closeAllModals() {
	document.querySelectorAll(".modal").forEach((modal) => {
		modal.classList.remove("modal-show");
		modal.style.display = "none";
	});
}

// Close modal when clicking outside
document.addEventListener("click", (e) => {
	if (e.target.classList.contains("modal")) {
		closeAllModals();
	}
});

// =============================================================================
// FORM HANDLERS
// =============================================================================

// Get all available groups for dropdowns
async function getGroupsList() {
	try {
		return await fetchAPI("/groups/");
	} catch (error) {
		return [];
	}
}

// Get all available students for dropdowns
async function getStudentsList() {
	try {
		return await fetchAPI("/students/");
	} catch (error) {
		return [];
	}
}

// Get all available sessions for dropdowns
async function getSessionsList() {
	try {
		return await fetchAPI("/sessions/");
	} catch (error) {
		return [];
	}
}

// Populate group dropdown
async function populateGroupDropdown(selectId) {
	const select = document.getElementById(selectId);
	if (!select) return;

	const groups = await getGroupsList();
	select.innerHTML = '<option value="">Select Group</option>';
	groups.forEach((group) => {
		const option = document.createElement("option");
		option.value = group.id;
		option.textContent = group.group_name;
		select.appendChild(option);
	});
}

// Populate student dropdown
async function populateStudentDropdown(selectId) {
	const select = document.getElementById(selectId);
	if (!select) return;

	const students = await getStudentsList();
	select.innerHTML = '<option value="">Select Student</option>';
	students.forEach((student) => {
		const option = document.createElement("option");
		option.value = student.id;
		option.textContent = student.full_name;
		select.appendChild(option);
	});
}

// Populate session dropdown
async function populateSessionDropdown(selectId) {
	const select = document.getElementById(selectId);
	if (!select) return;

	const sessions = await getSessionsList();
	select.innerHTML = '<option value="">Select Session</option>';
	sessions.forEach((session) => {
		const option = document.createElement("option");
		option.value = session.id;
		option.textContent = `${session.title} - Session #${session.session_number}`;
		select.appendChild(option);
	});
}
