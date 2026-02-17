import React, { useState } from "react";

interface Student {
	id: number;
	name: string;
	score: number;
}

interface StudentScoreCardProps {
	student: Student;
	onScoreUpdate: (studentId: number, delta: number) => void;
}

export default function StudentScoreCard({
	student,
	onScoreUpdate,
}: StudentScoreCardProps) {
	const [customInput, setCustomInput] = useState("");
	const [showCustomInput, setShowCustomInput] = useState(false);

	const handlePositiveScore = (amount: number) => {
		onScoreUpdate(student.id, amount);
	};

	const handleNegativeScore = (amount: number) => {
		onScoreUpdate(student.id, -amount);
	};

	const handleCustomApply = () => {
		const value = parseInt(customInput, 10);
		if (!isNaN(value) && value !== 0) {
			onScoreUpdate(student.id, value);
			setCustomInput("");
			setShowCustomInput(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleCustomApply();
		} else if (e.key === "Escape") {
			setShowCustomInput(false);
			setCustomInput("");
		}
	};

	return (
		<div className="rounded-lg bg-white p-4 shadow hover:shadow-lg transition-shadow">
			{/* Student Name */}
			<h3 className="text-center text-sm font-semibold truncate mb-3">
				{student.name}
			</h3>

			{/* Current Score (Large) */}
			<div className="mb-4 rounded-lg bg-blue-50 py-6 text-center">
				<p className="text-xs text-gray-600 mb-1">Score</p>
				<p className="text-4xl font-bold text-blue-600">{student.score}</p>
			</div>

			{/* Action Buttons */}
			<div className="space-y-2">
				{/* Positive Buttons (Green) */}
				<div className="grid grid-cols-3 gap-2">
					<button
						onClick={() => handlePositiveScore(1)}
						className="rounded-lg bg-green-500 text-white px-2 py-2 text-xs font-semibold hover:bg-green-600 transition-all active:scale-95"
					>
						+1
					</button>
					<button
						onClick={() => handlePositiveScore(3)}
						className="rounded-lg bg-green-500 text-white px-2 py-2 text-xs font-semibold hover:bg-green-600 transition-all active:scale-95"
					>
						+3
					</button>
					<button
						onClick={() => handlePositiveScore(5)}
						className="rounded-lg bg-green-500 text-white px-2 py-2 text-xs font-semibold hover:bg-green-600 transition-all active:scale-95"
					>
						+5
					</button>
				</div>

				{/* Negative Buttons (Red) */}
				<div className="grid grid-cols-3 gap-2">
					<button
						onClick={() => handleNegativeScore(1)}
						className="rounded-lg bg-red-500 text-white px-2 py-2 text-xs font-semibold hover:bg-red-600 transition-all active:scale-95"
					>
						-1
					</button>
					<button
						onClick={() => handleNegativeScore(3)}
						className="rounded-lg bg-red-500 text-white px-2 py-2 text-xs font-semibold hover:bg-red-600 transition-all active:scale-95"
					>
						-3
					</button>
					<button
						onClick={() => handleNegativeScore(5)}
						className="rounded-lg bg-red-500 text-white px-2 py-2 text-xs font-semibold hover:bg-red-600 transition-all active:scale-95"
					>
						-5
					</button>
				</div>
			</div>

			{/* Custom Input */}
			<div className="mt-3">
				{!showCustomInput ? (
					<button
						onClick={() => setShowCustomInput(true)}
						className="w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-2 text-xs text-gray-600 hover:bg-gray-100 transition-colors"
					>
						Custom Amount
					</button>
				) : (
					<div className="flex gap-1">
						<input
							type="number"
							value={customInput}
							onChange={(e) => setCustomInput(e.target.value)}
							onKeyPress={handleKeyPress}
							autoFocus
							placeholder="e.g., +2 or -10"
							className="flex-1 rounded-lg border border-gray-300 px-2 py-1 text-xs outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
						/>
						<button
							onClick={handleCustomApply}
							className="rounded-lg bg-blue-500 text-white px-2 py-1 text-xs font-semibold hover:bg-blue-600 transition-colors active:scale-95"
						>
							Apply
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
