import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { updateTemplateColor } from "../../../redux/reducers/formDataReducer";
import OutputButtonArea from "../../../components/buttons/OutputButtonArea";

const NavBar = styled.div`
	width: 100%;
	height: 60px;
	position: fixed;
	top: 0;
	left: 0;
	background-color: ${(props) => props.theme.color.neutral[100]};
	z-index: 1;
	padding: 10px 40px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const BackToEditorButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	${(props) => props.theme.font.content};
	color: #fff;
	width: 130px;
	height: 40px;
	border-radius: 20px;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		transition: background-color 0.3s;
		background-color: rgb(256, 256, 256, 0.2);
	}
`;

const SelectColorArea = styled.div`
	display: flex;
	align-items: center;
`;

const NoColor = styled.div`
	display: flex;
	align-items: center;
`;

const Color = styled.div`
	width: 30px;
	height: 30px;
	border-radius: 20px;
	border: 2px solid rgb(256, 256, 256, 0.3);
	background-color: ${(props) => props.color};
	cursor: ${(props) => (props.status === null ? "default" : "pointer")};
	position: relative;
	margin-right: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	justify-content: center;

	&::before {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 7px;
		height: 7px;
		border-radius: 5px;
		background-color: rgb(256, 256, 256, 0);
		transition: all 0.3s;
	}

	&:hover::before {
		transition: all 0.3s;
		background-color: ${(props) =>
			props.status === null || props.status === true ? "none" : "#fff"};
	}
`;

const CurrentColorIcon = styled.img`
	width: 12px;
	opacity: ${(props) => (props.status === true ? "1" : "0")};
	transition: all 0.3s;
`;

const LockIcon = styled.img`
	width: 12px;
`;

const ButtonIcon = styled.img`
	width: 10px;
	margin-right: 10px;
`;

const Colors = ({ tempColors }) => {
	const currentColor = useSelector((state) => state.formData.color);
	const dispatch = useDispatch();

	return tempColors.map((color) => {
		const status = color === currentColor ? true : false;

		return (
			<Color
				key={color}
				color={color}
				status={status}
				onClick={() => {
					dispatch(updateTemplateColor({ color }));
				}}>
				<CurrentColorIcon
					status={status}
					src="/images/icon/check.png"
				/>
			</Color>
		);
	});
};

NavbarArea.propTypes = {
	handleDownloadPdf: PropTypes.func,
	isDownloading: PropTypes.bool,
	setIsChoosingTemp: PropTypes.func,
	tempColors: PropTypes.array,
};

export default function NavbarArea({
	handleDownloadPdf,
	isDownloading,
	setIsChoosingTemp,
	tempColors,
}) {
	return (
		<NavBar>
			<BackToEditorButton
				onClick={() => {
					setIsChoosingTemp(false);
				}}>
				<ButtonIcon src="/images/icon/left.png" />
				Back to editor
			</BackToEditorButton>
			<SelectColorArea>
				{tempColors.length === 5 && <Colors tempColors={tempColors} />}
				{tempColors.length === 1 && (
					<NoColor>
						<Color color={"#000"} status={true}>
							<CurrentColorIcon
								status={true}
								src="/images/icon/check.png"
							/>
						</Color>
						<Color color={"#aaa"} status={null}>
							<LockIcon src="/images/icon/lock.png" />
						</Color>
						<Color color={"#aaa"} status={null}>
							<LockIcon src="/images/icon/lock.png" />
						</Color>
						<Color color={"#aaa"} status={null}>
							<LockIcon src="/images/icon/lock.png" />
						</Color>
						<Color color={"#aaa"} status={null}>
							<LockIcon src="/images/icon/lock.png" />
						</Color>
					</NoColor>
				)}
			</SelectColorArea>
			<OutputButtonArea
				handleDownloadPdf={handleDownloadPdf}
				isDownloading={isDownloading}
			/>
		</NavBar>
	);
}
