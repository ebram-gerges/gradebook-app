import React from "react";
import { useNavigate } from "react-router-dom";

export default function SessionModeSelector() {
	const navigate = useNavigate();

	const handleLiveSession = () => {
		navigate("/live-dashboard");
	};

	const handleRecordPast = () => {
		navigate("/record-past-session");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#0f0f1e] to-[#1a1a2e] flex items-center justify-center p-4">
			<div className="w-full max-w-2xl">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-white mb-2">Session Mode</h1>
					<p className="text-gray-400">
						Choose how you'd like to manage this session
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* Record Past Session Card */}
					<button
						onClick={handleRecordPast}
						className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 backdrop-blur-lg transition-all duration-300 hover:border-blue-500/30 hover:from-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20"
					>
						<div className="relative z-10 text-center">
							<div className="mb-4 flex justify-center">
								<div className="rounded-full bg-blue-500/20 p-4">
									<svg
										className="h-8 w-8 text-blue-400"
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
							<h2 className="text-xl font-semibold text-white mb-2">
								Record Past Session
							</h2>
							<p className="text-gray-400 text-sm">
								Enter grades for a session that already occurred
							</p>
						</div>
					</button>

					{/* Live Session Card */}
					<button
						onClick={handleLiveSession}
						className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 backdrop-blur-lg transition-all duration-300 hover:border-emerald-500/30 hover:from-emerald-500/10 hover:shadow-lg hover:shadow-emerald-500/20"
					>
						<div className="relative z-10 text-center">
							<div className="mb-4 flex justify-center">
								<div className="rounded-full bg-emerald-500/20 p-4">
									<svg
										className="h-8 w-8 text-emerald-400 animate-pulse"
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
							<h2 className="text-xl font-semibold text-white mb-2">
								Start Live Session
							</h2>
							<p className="text-gray-400 text-sm">
								Grade students in real-time as class happens
							</p>
						</div>
					</button>
				</div>
			</div>
		</div>
	);
}
