import React from "react";
import ReactDom from "react-dom/client";

import "./utils/reset.css";
import { GlobalStyle, theme } from "./utils/global.style.jsx";
import App from "./components/App";
import store from "./redux/store";

import { ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<Helmet>
				<link
					href="https://fonts.googleapis.com/earlyaccess/notosanstc.css"
					rel="stylesheet"
					crossOrigin="anonymous"
				/>
			</Helmet>
			<GlobalStyle />
			<App />
		</ThemeProvider>
	</Provider>
);
