import React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../../pages/HomePage";
import EditPage from "../../pages/EditPage";
import LoginPage from "../../pages/LoginPage";
import SignUpPage from "../../pages/SignUpPage";

const Root = styled.div``;

export default function App() {
	return (
		<Root>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/edit:resumeId" element={<EditPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
				</Routes>
			</BrowserRouter>
		</Root>
	);
}
