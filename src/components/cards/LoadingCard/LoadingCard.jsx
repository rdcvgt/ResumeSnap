import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes` 
  0% { 
		opacity: 0;
	}
  100% { 		opacity: 1;
}
`;

const LoadingArea = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	animation: ${fadeIn} 0.5s both;
`;

const LoadingRingArea = styled.div`
	display: flex;
	justify-content: center;
`;

const spin = keyframes` 
  0% { 
		transform: rotate(0deg); 
	}
  100% { transform: rotate(360deg); }
`;

const LoadingRing = styled.div`
	border: 4px solid ${(props) => props.theme.color.blue[10]};
	border-top: 4px solid ${(props) => props.theme.color.blue[50]}; /* Blue */
	border-radius: 50%;
	width: 50px;
	height: 50px;
	animation: ${spin} 0.4s linear infinite;
`;

const LoadingText = styled.div`
	${(props) => props.theme.font.title};
	margin-top: 30px;
`;

ConfirmCard.propTypes = {
	text: PropTypes.object,
	setIsClickDelete: PropTypes.func,
	handleDeleteButtonClick: PropTypes.func,
};

export default function ConfirmCard({ text }) {
	return (
		<>
			<LoadingArea>
				<LoadingRingArea>
					<LoadingRing />
				</LoadingRingArea>
				<LoadingText>{text}</LoadingText>
			</LoadingArea>
		</>
	);
}
