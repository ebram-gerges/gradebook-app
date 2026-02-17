import React from "react";
import { useNavigate } from "react-router-dom";

const LiveSessionMode = () => {
	const navigate = useNavigate();

	const handleSessionStart = () => {
		navigate("/live-dashboard");
	};

	const handleRecordPast = () => {
		navigate("/gradebook");
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="w-full max-w-2xl">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold mb-2">Session Mode</h1>
					<p className="text-gray-600">
						Choose how you'd like to manage this session
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Record Past Session Card */}
					<button
						onClick={handleRecordPast}
						className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
					>
						<div className="mb-4 flex justify-center">
							<div className="rounded-full bg-blue-100 p-4">
								<svg
									className="h-8 w-8 text-blue-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
						</div>
						<h2 className="text-xl font-semibold mb-2">Record Past Session</h2>
						<p className="text-gray-600 text-sm">
							Enter grades for a session that already occurred
						</p>
					</button>

					{/* Live Session Card */}
					<button
						onClick={handleSessionStart}
						className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition-shadow text-center"
					>
						<div className="mb-4 flex justify-center">
							<div className="rounded-full bg-green-100 p-4">
								<svg
									className="h-8 w-8 text-green-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
						</div>
						<h2 className="text-xl font-semibold mb-2">Start Live Session</h2>
						<p className="text-gray-600 text-sm">
							Grade students in real-time as class happens
						</p>
					</button>
				</div>
			</div>
		</div>
	);
};

export default LiveSessionMode;
