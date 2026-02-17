import React from "react";
import { Routes, Route } from "react-router-dom";
import LiveSessionMode from "./LiveSession/LiveSessionMode";
import LiveDashboard from "./LiveSession/LiveDashboard";
import Dashboard from "../pages/Dashboard";
import GradeBook from "../pages/GradeBook";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/gradebook" element={<GradeBook />} />
			<Route path="/live-session" element={<LiveSessionMode />} />
			<Route path="/live-dashboard" element={<LiveDashboard />} />
		</Routes>
	);
};

export default App;
