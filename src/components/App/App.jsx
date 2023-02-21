import React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../../pages/HomePage";
import SignUpPage from "../../pages/SignUpPage";
import SignInPage from "../../pages/SignInPage";
import AppPage from "../../pages/AppPage";
import EditPage from "../../pages/EditPage";

const Root = styled.div``;

export default function App() {
	return (
		<Root>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/signin" element={<SignInPage />} />
					<Route path="/app" element={<AppPage />} />
					<Route path="/edit/:resumeId" element={<EditPage />} />
				</Routes>
			</BrowserRouter>
		</Root>
	);
}
