import { css } from "styled-components";

export const NavbarStyle = css`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	width: 100%;
	height: 76px;
	-webkit-backdrop-filter: saturate(180%) blur(8px);
	backdrop-filter: saturate(180%) blur(8px);
	background-color: rgba(256, 256, 256, 0.8);
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px 32px;
`;
