import React from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import EditPage from "../../pages/EditPage";

const Root = styled.div``;

export default function App() {
	return (
		<Root>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/edit" element={<EditPage />} />
				</Routes>
			</BrowserRouter>
		</Root>
	);
}
