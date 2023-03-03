import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import {
	updateTemplateColor,
	updateTemplate,
} from "../../../redux/reducers/formDataReducer";
import OutputButtonArea from "../../../components/buttons/OutputButtonArea";
import { templateOrder } from "../../../utils/misc/templatePreviewOrder";

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

const OpenBottomToolButton = styled.div`
	cursor: pointer;
`;

const ToolButtonIcon = styled.img`
	width: 18px;
`;

const CloseButton = styled.div`
	cursor: pointer;
`;

const CloseButtonIcon = styled.img`
	width: 15px;
	filter: brightness(2);
`;

const moveIn = keyframes`
	0% { bottom: -150px; }
	100% { bottom: 0;}
`;

const BottomToolBar = styled.div`
	display: ${(props) => (props.isOpenToolButton ? "block" : "none")};
	width: 100%;
	height: 150px;
	position: fixed;
	bottom: -150px;
	left: 0;
	background-color: ${(props) => props.theme.color.neutral[100]};
	z-index: 1;
	padding: 20px 40px;
	animation: ${moveIn} 0.3s forwards;
`;

const ColorPickerArea = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;

const ToolTitle = styled.div`
	width: 100%;
	text-align: center;
	color: #fff;
	margin-bottom: 10px;
	${(props) => props.theme.font.infoBold};
`;

const TemplatePickerArea = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	margin-bottom: 15px;
	transition: justify-content 0.5s ease-in-out;
`;

const Template = styled.div`
	color: #fff;
	opacity: ${(props) => (props.selected ? "1" : "0.3")};
	${(props) => props.theme.font.info};
	margin-right: 20px;
	&:nth-last-child(1) {
		margin-right: 0px;
	}
`;

const TemplatesDisplay = styled.div`
	display: flex;
	align-items: center;
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

const ColorPicker = ({ tempColors }) => {
	return (
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
	);
};

ColorPicker.propTypes = {
	tempColors: PropTypes.array,
};

const TemplateDisplayArea = () => {
	const currentTemplate = useSelector((state) => state.formData.template);
	const [isSelectedTemplate, setIsSelectedTemplate] =
		useState(currentTemplate);
	const dispatch = useDispatch();

	const handleTemplateClick = (template) => {
		setIsSelectedTemplate(template.template);
		dispatch(
			updateTemplate({
				templateName: template.template,
			})
		);
		dispatch(updateTemplateColor({ color: template.color }));
	};

	return (
		<TemplatesDisplay isSelectedTemplate={isSelectedTemplate}>
			{templateOrder.map((template, index) => {
				return (
					<Template
						key={template.template}
						selected={
							isSelectedTemplate === template.template
								? true
								: false
						}
						onClick={() => {
							handleTemplateClick(template);
						}}>
						{template.template}
					</Template>
				);
			})}
		</TemplatesDisplay>
	);
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
	const BottomToolBarRef = useRef();
	const OpenBottomToolButtonRef = useRef();
	const [isOpenToolButton, setIsOpenToolButton] = useState(false);

	// 若使用者點擊選單以外區域則會關閉選單
	useEffect(() => {
		const handleOpenToolButtonClick = (e) => {
			if (e.target === null) return;
			if (!BottomToolBarRef.current) return;
			if (!BottomToolBarRef.current.contains(e.target)) {
				setIsOpenToolButton(false);
			}
		};
		window.addEventListener("click", handleOpenToolButtonClick);
		//刪除註冊監聽器
		return () => {
			window.removeEventListener("click", handleOpenToolButtonClick);
		};
	}, [BottomToolBarRef]);

	return (
		<>
			<NavBar>
				<MediaQuery minWidth={768}>
					<BackToEditorButton
						onClick={() => {
							setIsChoosingTemp(false);
						}}>
						<ButtonIcon src="/images/icon/left.png" />
						Back to editor
					</BackToEditorButton>
				</MediaQuery>

				<MediaQuery minWidth={768}>
					<ColorPicker tempColors={tempColors} />
				</MediaQuery>

				<MediaQuery maxWidth={767}>
					<OpenBottomToolButton
						ref={OpenBottomToolButtonRef}
						onClick={(e) => {
							e.stopPropagation();
							setIsOpenToolButton(!isOpenToolButton);
						}}>
						<ToolButtonIcon src="/images/icon/custom_white.png" />
					</OpenBottomToolButton>
				</MediaQuery>
				<OutputButtonArea
					handleDownloadPdf={handleDownloadPdf}
					isDownloading={isDownloading}
					isChoosingTemp={true}
				/>

				<MediaQuery maxWidth={767}>
					<CloseButton
						onClick={() => {
							setIsChoosingTemp(false);
						}}>
						<CloseButtonIcon src="/images/icon/cancel.png" />
					</CloseButton>
				</MediaQuery>
			</NavBar>

			<MediaQuery maxWidth={767}>
				<BottomToolBar
					ref={BottomToolBarRef}
					isOpenToolButton={isOpenToolButton}>
					<TemplatePickerArea>
						<ToolTitle>Template</ToolTitle>
						<TemplateDisplayArea />
					</TemplatePickerArea>

					<ColorPickerArea>
						<ToolTitle>Accent Color</ToolTitle>
						<ColorPicker tempColors={tempColors} />
					</ColorPickerArea>
				</BottomToolBar>
			</MediaQuery>
		</>
	);
}
