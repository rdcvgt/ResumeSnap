import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

import { DefaultButtonStyle } from "../../../components/buttons/button.style";

import { SubtitleStyle, MainTitleStyle } from "../homepage.style";

const Root = styled.div`
	width: 100%;
	height: 253px;
	background-color: ${(props) => props.theme.color.neutral[100]};
	padding: 50px 32px;
	color: #fff;
	display: flex;
	align-items: center;
`;

const Contact = styled.div`
	width: 360px;
	margin: 0 auto;
	text-align: center;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;
const Text = styled.div`
	width: 100%;
	${(props) => props.theme.font.homePageDescription};
`;

const Links = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
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

	opacity: 0.5;

	&:hover {
		opacity: 1;
		transition: all 0.3s;
	}
`;

const LinkIcon = styled.img`
	width: 100%;
`;

export default function HomePageArea() {
	return (
		<Root>
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
		</Root>
	);
}
