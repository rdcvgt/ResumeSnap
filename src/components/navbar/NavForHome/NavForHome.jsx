import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { NavbarStyle } from "../navbar.style";
import {
	DefaultButtonStyle,
	SecondaryButtonStyle,
} from "../../buttons/button.style";
import { auth } from "../../../utils/firebase/firebaseInit";

const Navbar = styled.div`
	${NavbarStyle}
`;

const Logo = styled.img`
	cursor: pointer;
`;

const EntryButtons = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const LoginButton = styled.div`
	${SecondaryButtonStyle}
	color: ${(props) => props.theme.color.blue[50]};
	border: 1px solid ${(props) => props.theme.color.blue[50]};
	width: 100px;
	height: 50px;

	&:hover {
		background-color: ${(props) => props.theme.color.neutral[10]};
	}
`;

const SignUpButton = styled.div`
	${DefaultButtonStyle}
	width: 100px;
	border: 1px solid #ccc;
	height: 50px;
	margin-left: 10px;
`;

const MyAccountButton = styled.div`
	${SecondaryButtonStyle}
	border: 1px solid ${(props) => props.theme.color.blue[50]};
	color: ${(props) => props.theme.color.blue[50]};
	width: 130px;
	height: 50px;

	&:hover {
		background-color: ${(props) => props.theme.color.neutral[10]};
	}
`;

const MenuButton = styled.div`
	width: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;

const MenuIcon = styled.img`
	width: 100%;
`;

const fadeIn = keyframes`
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
`;

const Menu = styled.div`
	display: ${(props) => (props.isClickMenu ? "block" : "none")};
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0px;
	right: 0;
	background-color: #fff;
	z-index: 15;
	animation: ${fadeIn} 0.5s;
`;

const CloseButton = styled.img`
	position: absolute;
	right: 32px;
	top: 32px;
	width: 15px;
`;

const Items = styled.div`
	margin-top: 76px;
	padding: 0 30px;
	height: 50%;
`;

const Item = styled.div`
	margin-bottom: 20px;
	height: 40px;
	font-size: 16px;
	font-weight: 500;
	color: ${(props) => props.theme.color.blue[50]};
	display: flex;
	align-items: center;
	cursor: pointer;
`;

const ActionIcon = styled.img`
	transform: rotate(90deg);
	width: 10px;
	margin-left: 10px;
`;

const Footer = styled.div`
	height: 50%;
	background-color: ${(props) => props.theme.color.neutral[15]};
	padding: 30px;
`;

const Contact = styled.div`
	width: 100%;
	margin: 0 auto;
	text-align: center;
	display: flex;
	flex-wrap: wrap;
`;
const Text = styled.div`
	width: 100%;
	${(props) => props.theme.font.homePageDescription};
	text-align: left;
`;

const Links = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	margin-top: 20px;
`;

const Link = styled.a`
	width: 40px;
	height: 40px;
	border-radius: 40px;
	margin-right: 20px;
	transition: all 0.3s;

	&:nth-last-child(1) {
		margin-right: 0px;
	}

	opacity: 1;

	&:hover {
		opacity: 1;
		transition: all 0.3s;
	}
`;

const LinkIcon = styled.img`
	width: 100%;
`;

const MediaQuery = styled.div`
	display: none;

	@media (min-width: ${({ minWidth }) => minWidth}px) {
		display: initial;
	}

	@media (max-width: ${({ maxWidth }) => maxWidth}px) {
		display: initial;
	}
`;

export default function NavForEntry() {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(true);
	const [isClickMenu, setIsClickMenu] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setIsLogin(true);
			if (!user) {
				setIsLogin(false);
			}
		});
	}, []);

	return (
		<>
			<Navbar>
				<Logo
					src="/images/logo/logo.png"
					onClick={() => {
						navigate("/");
					}}
				/>
				<MediaQuery minWidth={768}>
					{isLogin && (
						<MyAccountButton
							onClick={() => {
								navigate("/dashboard");
							}}>
							My Account
						</MyAccountButton>
					)}
					{!isLogin && (
						<EntryButtons>
							<LoginButton
								onClick={() => {
									navigate("/signin");
								}}>
								Log In
							</LoginButton>
							<SignUpButton
								onClick={() => {
									navigate("/signup");
								}}>
								Sign Up
							</SignUpButton>
						</EntryButtons>
					)}
				</MediaQuery>
				<MediaQuery maxWidth={767}>
					<MenuButton
						onClick={() => {
							setIsClickMenu(true);
						}}>
						<MenuIcon src="/images/icon/hamburger.png" />
					</MenuButton>
				</MediaQuery>
			</Navbar>
			<Menu isClickMenu={isClickMenu}>
				<CloseButton
					src="/images/icon/cancel.png"
					onClick={() => {
						setIsClickMenu(false);
					}}
				/>
				<Items>
					{!isLogin && (
						<Item
							onClick={() => {
								navigate("/signin");
							}}>
							Log In <ActionIcon src="/images/icon/up_blue.png" />
						</Item>
					)}
					{!isLogin && (
						<Item
							onClick={() => {
								navigate("/signup");
							}}>
							Create My Resume{" "}
							<ActionIcon src="/images/icon/up_blue.png" />
						</Item>
					)}
					{isLogin && (
						<Item
							onClick={() => {
								navigate("/dashboard");
							}}>
							My Resumes{" "}
							<ActionIcon src="/images/icon/up_blue.png" />
						</Item>
					)}
				</Items>
				<Footer>
					<Contact>
						<Text>Finley peng © 2023</Text>
						<Links>
							<Link href="https://github.com/rdcvgt/resume_builder">
								<LinkIcon src="/images/icon/github.png" />
							</Link>
							<Link href="https://www.linkedin.com/in/sheng-wei-finley-peng-9015931b2/">
								<LinkIcon src="/images/icon/linkedin.png" />
							</Link>
						</Links>
					</Contact>
				</Footer>
			</Menu>
		</>
	);
}
