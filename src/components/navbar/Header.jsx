import React from "react";
import styled from "styled-components";

import { darkerWhenHover } from "../buttons/button.style";

const Navbar = styled.div`
	width: 100%;
	height: 76px;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border: 1px solid #ccc;
	padding: 22px 32px;
`;

const Logo = styled.img``;

const CloseButton = styled.img`
	${darkerWhenHover}
	width: 20px;
`;

export default function Header() {
	return (
		<Navbar>
			<Logo src="/images/logo/logo.png" />
			<CloseButton src="/images/icon/close.png" />
		</Navbar>
	);
}
