import React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../../pages/HomePage";
import SignUpPage from "../../pages/SignUpPage";
import SignInPage from "../../pages/SignInPage";
import DashboardPage from "../../pages/DashboardPage";
import EditPage from "../../pages/EditPage";
import SharePage from "../../pages/SharePage";

const Root = styled.div``;

export default function App() {
	return (
		<Root>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/signin" element={<SignInPage />} />
					<Route path="/dashboard" element={<DashboardPage />} />
					<Route path="/edit/:resumeId" element={<EditPage />} />
					<Route path="/share/:resumeId" element={<SharePage />} />
				</Routes>
			</BrowserRouter>
		</Root>
	);
}
