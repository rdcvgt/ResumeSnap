import { createGlobalStyle, css } from "styled-components";

export const GlobalStyle = createGlobalStyle`
	* {
			font-family: 'Noto Sans TC';
			box-sizing: border-box;
	}
  body {
    margin: 0;
    padding: 0;
  }
`;

export const theme = {
	color: {
		white: "#ffffff",
		neutral: {
			5: "#f7f9fc",
			10: "#eff2f9",
			15: "#e7eaf4",
			20: "#d9deeb",
			30: "#bec4d5",
			40: "#9fa6bb",
			50: "#828ba2",
			60: "#656e83",
			70: "#495163",
			80: "#303848",
			90: "#1e2532",
			100: "#0f141e",
		},
		blue: {
			10: "#eaf6ff",
			20: "#c3e5fe",
			30: "#92cdfc",
			40: "#54aff8",
			50: "#1a91f0",
			60: "#1170cd",
			70: "#10529b",
			80: "#0f3871",
			90: "#0c264c",
			100: "#09162d",
		},
		indigo: {
			10: "#f1f2ff",
			20: "#dbdeff",
			30: "#bec2fe",
			40: "#9ba1fb",
			50: "#7a82f5",
			60: "#5660e8",
			70: "#343ecc",
			80: "#282b8f",
			90: "#1a1c6a",
			100: "#0e0f47",
		},
		green: {
			10: "#e7f4ed",
			20: "#c6e4d2",
			30: "#96d0ad",
			40: "#48ba75",
			50: "#339d5d",
			60: "#217d47",
			70: "#135c37",
			80: "#094025",
			90: "#042b18",
			100: "#01180d",
		},
		amber: {
			10: "#fff2cc",
			20: "#fddb8c",
			30: "#f9ba44",
			40: "#ec930c",
			50: "#cf760d",
			60: "#a85a0e",
			70: "#7f400d",
			80: "#582c0c",
			90: "#3e1d0a",
			100: "#231007",
		},
		orange: {
			10: "#feebe3",
			20: "#fdd2c0",
			30: "#fbb092",
			40: "#f68559",
			50: "#ee571d",
			60: "#bf4213",
			70: "#8b3211",
			80: "#5e240e",
			90: "#3b180b",
			100: "#1c0c06",
		},
		red: {
			10: "#ffeaec",
			20: "#ffd0d5",
			30: "#ffacb5",
			40: "#fe7d8b",
			50: "#fb4458",
			60: "#da0c22",
			70: "#a10e1d",
			80: "#6f0e19",
			90: "#470c12",
			100: "#24090c",
		},
		beige: {
			10: "#f3f1eb",
			20: "#e1ddd2",
			30: "#cbc3b3",
			40: "#afa58f",
			50: "#968a70",
			60: "#776d59",
			70: "#575041",
			80: "#3c372d",
			90: "#27241d",
			100: "#15130f",
		},
	},

	font: {
		title: css`
			font-size: 20px;
			font-weight: 500;
		`,
		content: css`
			font-size: 14px;
			font-weight: 400;
		`,
		blockTitle: css`
			font-size: 16px;
			font-weight: 700;
		`,
		info: css`
			font-size: 12px;
			font-weight: 400;
		`,
		infoBold: css`
			font-size: 12px;
			font-weight: 600;
		`,
		itemBold: css`
			font-size: 14px;
			font-weight: 700;
		`,
	},

	input: {
		title: css`
			${(props) => props.theme.font.info};
			color: ${(props) => props.theme.color.neutral[50]};
			margin-bottom: 5px;
		`,
		shortInput: css`
			${(props) => props.theme.font.content};
			border: 0;
			width: 100%;
			height: 50px;
			outline: none;
			border-radius: 5px;
			background-color: ${(props) => props.theme.color.neutral[10]};
			padding: 10px;
			caret-color: ${(props) => props.theme.color.blue[50]};
		`,
	},
};
