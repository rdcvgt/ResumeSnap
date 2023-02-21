import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = styled.div`
	width: 130px;
	height: 40px;
	border-radius: 5px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	${(props) => props.theme.font.itemBold};
	background-color: ${(props) => props.theme.color.blue[50]};
	transition: background-color 0.3s;

	&:hover {
		transition: background-color 0.3s;
		background-color: ${(props) => props.theme.color.blue[60]};
	}
`;

DefaultButton.propTypes = {
	children: PropTypes.string,
};

export default function DefaultButton({ children }) {
	return (
		<>
			<Button>{children}</Button>
		</>
	);
}
