import React, { useState } from "react";
import styled from "styled-components";

const BlockContainer = styled.div`
	width: 90%;
	height: auto;
	margin: 50px auto;
`;

const BlockTitle = styled.div`
	margin-bottom: 20px;
	${(props) => props.theme.font.blockTitle};
	color: ${(props) => props.theme.color.neutral[90]};
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
	color: ${(props) => props.theme.color.blue[50]};
	${(props) => props.theme.font.infoBold};
	cursor: pointer;
`;

export default function PersonalDetails() {
	const [isClick, setIsClick] = useState(false);
	return (
		<BlockContainer>
			<BlockTitle>個人資料</BlockTitle>
			<BlockRow>
				<LeftCol>
					<InputTitle>想要的工作職稱</InputTitle>
					<ShortInput type="text" name="position"></ShortInput>
				</LeftCol>
				<RightCol>
					<InputTitle>想要的工作職稱</InputTitle>
					<ShortInput type="text" name="position"></ShortInput>
				</RightCol>
			</BlockRow>
			<BlockRow>
				<LeftCol>
					<InputTitle>姓氏</InputTitle>
					<ShortInput type="text" name="firstName"></ShortInput>
				</LeftCol>
				<RightCol>
					<InputTitle>名字</InputTitle>
					<ShortInput type="text" name="lastName"></ShortInput>
				</RightCol>
			</BlockRow>
			<BlockRow>
				<LeftCol>
					<InputTitle>電子郵件</InputTitle>
					<ShortInput type="text" name="email"></ShortInput>
				</LeftCol>
				<RightCol>
					<InputTitle>手機號碼</InputTitle>
					<ShortInput type="text" name="phone"></ShortInput>
				</RightCol>
			</BlockRow>
			<MoreInput isClick={isClick}>
				<BlockRow>
					<LeftCol>
						<InputTitle>居住國家</InputTitle>
						<ShortInput type="text" name="country"></ShortInput>
					</LeftCol>
					<RightCol>
						<InputTitle>現居城市</InputTitle>
						<ShortInput type="text" name="city"></ShortInput>
					</RightCol>
				</BlockRow>
				<BlockRow>
					<LeftCol>
						<InputTitle>通訊地址</InputTitle>
						<ShortInput type="text" name="address"></ShortInput>
					</LeftCol>
					<RightCol>
						<InputTitle>郵遞區號</InputTitle>
						<ShortInput type="text" name="postalCode"></ShortInput>
					</RightCol>
				</BlockRow>
				<BlockRow>
					<LeftCol>
						<InputTitle>駕駛執照</InputTitle>
						<ShortInput
							type="text"
							name="drivingLicense"></ShortInput>
					</LeftCol>
					<RightCol>
						<InputTitle>國籍</InputTitle>
						<ShortInput type="text" name="nationality"></ShortInput>
					</RightCol>
				</BlockRow>
			</MoreInput>
			<AdditionalButton
				onClick={() => {
					setIsClick(!isClick);
				}}>
				{isClick === true ? "隱藏" : "展開"}更多資訊
			</AdditionalButton>
		</BlockContainer>
	);
}
