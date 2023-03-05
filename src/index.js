import React from "react";
import ReactDom from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";

import "./utils/style/reset.css";
import { GlobalStyle, theme } from "./utils/style/global.style.jsx";
import App from "./components/App";
import store from "./redux/store";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const root = ReactDom.createRoot(document.getElementById("root"));
let persistor = persistStore(store);

root.render(
	<Provider store={store}>
		<ThemeProvider theme={theme}>
			<Helmet>
				<link
					href="https://fonts.googleapis.com/earlyaccess/notosanstc.css"
					rel="stylesheet"
					crossOrigin="anonymous"
				/>
				<meta name="author" content="Finley Peng" />
			</Helmet>
			<GlobalStyle />
			<PersistGate persistor={persistor}>
				<App />
			</PersistGate>
		</ThemeProvider>
	</Provider>
);
