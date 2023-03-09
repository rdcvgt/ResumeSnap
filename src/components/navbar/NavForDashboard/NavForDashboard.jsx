import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import UserMenu from "../UserMenu";
import { NavbarStyle } from "../navbar.style";

const Navbar = styled.div`
	${NavbarStyle}
	border-bottom: 1px solid ${(props) => props.theme.color.neutral[10]};
`;

const Logo = styled.img`
	cursor: pointer;
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
			<UserMenu pageFrom="dashboard" />
		</Navbar>
	);
}
