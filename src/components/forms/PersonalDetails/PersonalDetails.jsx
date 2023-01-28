import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import TitleBlock from "../utils/TitleBlock";

const BlockContainer = styled.div`
	width: 90%;
	height: auto;
	margin: 50px auto;
`;

const BlockRow = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 30px;
`;

const LeftCol = styled.div`
	margin-right: 30px;
	width: 50%;
`;

const RightCol = styled.div`
	width: 50%;
`;

const InputTitle = styled.div`
	${(props) => props.theme.input.title};
`;

const ShortInput = styled.input`
	${(props) => props.theme.input.shortInput};
`;

const MoreInput = styled.div`
	overflow: hidden;
	max-height: 0;
	opacity: 0;
	transition: max-height 0.6s, opacity 0.6s;
	${(props) =>
		props.isClick &&
		`
	max-height: 600px; overflow: visible; opacity: 1;
	`}
`;

const AdditionalButton = styled.div`
	display: inline-block;
	color: ${(props) => props.theme.color.blue[50]};
	${(props) => props.theme.font.infoBold};
	cursor: pointer;
`;

PersonalDetails.propTypes = {
	handleInputData: PropTypes.func,
};

export default function PersonalDetails({ handleInputData }) {
	const [isClick, setIsClick] = useState(false);
	const [timer, setTimer] = useState(null);
	const [blockTitle, setBlockTitle] = useState("個人資訊");

	const [formData, setFormData] = useState({});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		clearTimeout(timer);
		const newTimer = setTimeout(() => {
			setFormData({ ...formData, [name]: value });
		}, 300);
		setTimer(newTimer);
	};

	useEffect(() => {
		let data = {
			block: "PersonalDetails",
			content: { formData, blockTitle },
		};
		handleInputData(data);
	}, [formData, blockTitle]);

	return (
		<BlockContainer>
			<TitleBlock
				title={{ blockTitle, setBlockTitle }}
				hideDraggableIcon={true}
			/>
			<form>
				<BlockRow>
					<LeftCol>
						<InputTitle>求職職位</InputTitle>
						<ShortInput
							type="text"
							name="position"
							onChange={handleInputChange}></ShortInput>
					</LeftCol>
					<RightCol>
						<InputTitle>照片</InputTitle>
						<ShortInput type="text"></ShortInput>
					</RightCol>
				</BlockRow>
				<BlockRow>
					<LeftCol>
						<InputTitle>姓氏</InputTitle>
						<ShortInput
							type="text"
							name="lastName"
							onChange={handleInputChange}></ShortInput>
					</LeftCol>
					<RightCol>
						<InputTitle>名字</InputTitle>
						<ShortInput
							type="text"
							name="firstName"
							onChange={handleInputChange}></ShortInput>
					</RightCol>
				</BlockRow>
				<BlockRow>
					<LeftCol>
						<InputTitle>電子郵件</InputTitle>
						<ShortInput
							type="text"
							name="email"
							onChange={handleInputChange}></ShortInput>
					</LeftCol>
					<RightCol>
						<InputTitle>手機號碼</InputTitle>
						<ShortInput
							type="text"
							name="phone"
							onChange={handleInputChange}></ShortInput>
					</RightCol>
				</BlockRow>
				<MoreInput isClick={isClick}>
					<BlockRow>
						<LeftCol>
							<InputTitle>居住國家</InputTitle>
							<ShortInput
								type="text"
								name="country"
								onChange={handleInputChange}></ShortInput>
						</LeftCol>
						<RightCol>
							<InputTitle>現居城市</InputTitle>
							<ShortInput
								type="text"
								name="city"
								onChange={handleInputChange}></ShortInput>
						</RightCol>
					</BlockRow>
					<BlockRow>
						<LeftCol>
							<InputTitle>通訊地址</InputTitle>
							<ShortInput
								type="text"
								name="address"
								onChange={handleInputChange}></ShortInput>
						</LeftCol>
						<RightCol>
							<InputTitle>郵遞區號</InputTitle>
							<ShortInput
								type="text"
								name="postalCode"
								onChange={handleInputChange}></ShortInput>
						</RightCol>
					</BlockRow>
					<BlockRow>
						<LeftCol>
							<InputTitle>駕駛執照</InputTitle>
							<ShortInput
								type="text"
								name="drivingLicense"
								onChange={handleInputChange}></ShortInput>
						</LeftCol>
						<RightCol>
							<InputTitle>國籍</InputTitle>
							<ShortInput
								type="text"
								name="nationality"
								onChange={handleInputChange}></ShortInput>
						</RightCol>
					</BlockRow>
				</MoreInput>
			</form>
			<AdditionalButton
				onClick={() => {
					setIsClick(!isClick);
				}}>
				{isClick === true ? "隱藏" : "展開"}更多資訊
			</AdditionalButton>
		</BlockContainer>
	);
}
