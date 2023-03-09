import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { NavbarStyle } from "../navbar.style";
import { darkerWhenHover } from "../../buttons/button.style";

const Navbar = styled.div`
	${NavbarStyle}
`;

const Logo = styled.img`
	cursor: pointer;
`;

const CloseButton = styled.img`
	${darkerWhenHover}
	width: 15px;
`;

export default function NavForEntry() {
	const navigate = useNavigate();

	return (
		<Navbar>
			<Logo
				src="/images/logo/logo.png"
				onClick={() => {
					navigate("/");
				}}
			/>
			<CloseButton
				src="/images/icon/cancel.png"
				onClick={() => {
					navigate("/");
				}}
			/>
		</Navbar>
	);
}
