import React, { useState, useEffect, useCallback } from "react";
import StudentScoreCard from "./StudentScoreCard";

interface Student {
	id: number;
	name: string;
	score: number;
}

export default function LiveDashboard() {
	const [students, setStudents] = useState<Student[]>([
		{ id: 1, name: "Ahmed Hassan", score: 0 },
		{ id: 2, name: "Fatima Ali", score: 0 },
		{ id: 3, name: "Mohamed Karim", score: 0 },
		{ id: 4, name: "Leila Samir", score: 0 },
	]);

	const [sessionTime, setSessionTime] = useState(0);
	const [isRunning, setIsRunning] = useState(true);
	const [className] = useState("Grade 5 - Math");
	const [nextStudentId, setNextStudentId] = useState(students.length + 1);

	// Timer logic
	useEffect(() => {
		if (!isRunning) return;

		const interval = setInterval(() => {
			setSessionTime((prev) => prev + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [isRunning]);

	// Format time as MM:SS
	const formatTime = (seconds: number): string => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	// Update student score (optimistic update)
	const handleScoreUpdate = useCallback((studentId: number, delta: number) => {
		setStudents((prevStudents) =>
			prevStudents.map((student) =>
				student.id === studentId
					? { ...student, score: Math.max(0, student.score + delta) }
					: student,
			),
		);

		// Mock API call - logs to console
		syncScore(studentId, delta);
	}, []);

	// Add new student to session
	const handleAddStudent = () => {
		const newName = prompt("Enter student name:");
		if (newName && newName.trim()) {
			setStudents((prevStudents) => [
				...prevStudents,
				{ id: nextStudentId, name: newName.trim(), score: 0 },
			]);
			setNextStudentId((prev) => prev + 1);
		}
	};

	// End session
	const handleEndSession = () => {
		if (confirm("End this session? Unsaved changes will be lost.")) {
			setIsRunning(false);
			// Navigate to session summary or back
			console.log("Session ended. Students:", students);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100">
			{/* Top Bar */}
			<header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow">
				<div className="flex items-center justify-between px-6 py-4">
					<div className="flex items-center gap-4">
						<div>
							<h1 className="text-lg font-semibold">{className}</h1>
							<p className="text-sm text-gray-600">Live Session</p>
						</div>
					</div>

					<div className="flex items-center gap-8">
						{/* Timer */}
						<div className="flex items-center gap-2">
							<div className="flex h-10 w-20 items-center justify-center rounded-lg bg-blue-100 font-mono text-lg font-semibold text-blue-600">
								{formatTime(sessionTime)}
							</div>
							<button
								onClick={() => setIsRunning(!isRunning)}
								className="rounded-lg bg-gray-500 text-white px-3 py-2 text-sm hover:bg-gray-600 transition-colors"
							>
								{isRunning ? "Pause" : "Resume"}
							</button>
						</div>

						{/* End Session Button */}
						<button
							onClick={handleEndSession}
							className="rounded-lg bg-red-500 text-white px-4 py-2 font-semibold hover:bg-red-600 transition-colors"
						>
							End Session
						</button>
					</div>
				</div>
			</header>

			{/* Students Grid */}
			<main className="p-6">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{students.map((student) => (
						<StudentScoreCard
							key={student.id}
							student={student}
							onScoreUpdate={handleScoreUpdate}
						/>
					))}
				</div>

				{/* Empty state */}
				{students.length === 0 && (
					<div className="flex flex-col items-center justify-center py-12">
						<p className="text-gray-600 text-lg">No students added yet</p>
					</div>
				)}
			</main>

			{/* Floating Action Button */}
			<button
				onClick={handleAddStudent}
				className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all hover:shadow-xl"
			>
				<svg
					className="h-6 w-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 4v16m8-8H4"
					/>
				</svg>
			</button>
		</div>
	);
}

/**
 * Mock function to sync score with backend
 * Replace with actual API call later
 */
function syncScore(studentId: number, delta: number) {
	console.log(
		`📊 Score Update: Student ID ${studentId}, Delta: ${delta > 0 ? "+" : ""}${delta}`,
	);
	// TODO: Replace with actual API call
	// await fetch(`/api/sessions/current/students/${studentId}/score`, {
	//   method: 'PATCH',
	//   body: JSON.stringify({ delta })
	// })
}
