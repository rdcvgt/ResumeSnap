import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { darkerWhenHover } from "../../buttons/button.style";

const Navbar = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	width: 100%;
	height: 76px;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 32px 22px;
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
