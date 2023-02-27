import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

import {
	DefaultButtonStyle,
	SecondaryButtonStyle,
} from "../../buttons/button.style";

const fadeIn = keyframes`
	0% { opacity: 0; }
	100% { opacity: 1; }
`;

const rollingIn = keyframes`
	0% { opacity: 0; top:40%; }
	100% { opacity: 1; top:50%; }
`;

const CardBackground = styled.div`
	z-index: 10;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgb(0, 0, 0, 0.5);
	animation: ${fadeIn} 0.3s forwards;
`;

const Card = styled.div`
	z-index: 11;
	width: 500px;
	height: 250px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
	border-radius: 10px;
	padding: 30px;
	animation: ${rollingIn} 0.4s forwards;
`;

const Title = styled.div`
	${(props) => props.theme.font.title};
	margin-bottom: 20px;
`;

const Description = styled.div`
	${(props) => props.theme.font.content};
`;

const Buttons = styled.div`
	display: flex;
	justify-content: flex-end;
	position: absolute;
	right: 30px;
	bottom: 30px;
`;

const LeftButton = styled.div`
	${SecondaryButtonStyle}
	margin-right: 20px;
	width: 120px;
	height: 50px;
`;

const RightButton = styled.div`
	${DefaultButtonStyle}

	width: 120px;
	height: 50px;
`;

const CloseIcon = styled.img`
	width: 15px;
	position: absolute;
	top: 30px;
	right: 30px;
	cursor: pointer;
	opacity: 0.5;
	transition: all 0.3s;

	&:hover {
		transition: all 0.3s;
		opacity: 1;
	}
`;

ConfirmCard.propTypes = {
	text: PropTypes.object,
	setIsClickDelete: PropTypes.func,
	handleDeleteButtonClick: PropTypes.func,
};

export default function ConfirmCard({
	text,
	setIsClickDelete,
	handleDeleteButtonClick,
}) {
	return (
		<>
			<CardBackground
				onClick={(e) => {
					e.nativeEvent.stopImmediatePropagation();
					setIsClickDelete(false);
				}}></CardBackground>
			<Card>
				<Title>{text.title}</Title>
				<Description>{text.description}</Description>
				<Buttons>
					<LeftButton onClick={handleDeleteButtonClick}>
						{text.leftButton}
					</LeftButton>
					<RightButton
						onClick={() => {
							setIsClickDelete(false);
						}}>
						{text.rightButton}
					</RightButton>
				</Buttons>
				<CloseIcon
					src="/images/icon/cancel.png"
					onClick={() => {
						setIsClickDelete(false);
					}}
				/>
			</Card>
		</>
	);
}
