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
	const [personalDetails, setPersonalDetails] = useState({
		blockTitle: null,
		position: null,
		firstName: null,
		lastName: null,
		email: null,
		phone: null,
		country: null,
		city: null,
		address: null,
		postalCode: null,
		drivingLicense: null,
		nationality: null,
	});
	const [isClick, setIsClick] = useState(false);
	const [timer, setTimer] = useState(null);
	const [blockTitle, setBlockTitle] = useState("個人資訊");
	const [position, setPosition] = useState("行銷專員");
	const [lastName, setLastName] = useState("彭");
	const [firstName, setFirstName] = useState("勝緯");
	const [email, setEmail] = useState("weilllyox1020@gmail.com");
	const [phone, setPhone] = useState("0975191406");
	const [country, setCountry] = useState("臺灣");
	const [city, setCity] = useState("臺北");
	const [address, setAddress] = useState(
		"新北市新店區中正路 307 巷 26 號 4 樓"
	);
	const [postalCode, setPostalCode] = useState("231");
	const [drivingLicense, setDrivingLicense] = useState("機車、汽車");
	const [nationality, setNationality] = useState("臺灣");

	//表格項目有變動 state，則呼叫 updateInputData
	useEffect(() => {
		updateInputData("blockTitle", blockTitle);
	}, [blockTitle]);

	useEffect(() => {
		updateInputData("position", position);
	}, [position]);

	useEffect(() => {
		updateInputData("lastName", lastName);
	}, [lastName]);

	useEffect(() => {
		updateInputData("firstName", firstName);
	}, [firstName]);

	useEffect(() => {
		updateInputData("email", email);
	}, [email]);

	useEffect(() => {
		updateInputData("phone", phone);
	}, [phone]);

	useEffect(() => {
		updateInputData("country", country);
	}, [country]);

	useEffect(() => {
		updateInputData("city", city);
	}, [city]);

	useEffect(() => {
		updateInputData("address", address);
	}, [address]);

	useEffect(() => {
		updateInputData("postalCode", postalCode);
	}, [postalCode]);

	useEffect(() => {
		updateInputData("drivingLicense", drivingLicense);
	}, [drivingLicense]);

	useEffect(() => {
		updateInputData("nationality", nationality);
	}, [nationality]);

	//若使用者閒置輸入超過 1 秒，則 setPersonalDetails
	const updateInputData = (inputName, state) => {
		clearTimeout(timer);
		const newTimer = setTimeout(() => {
			//保留先前已儲存的其他 state 資料，只改變有變動的項目
			setPersonalDetails((preData) => ({
				...preData,
				[inputName]: state,
			}));
		}, 1000);
		setTimer(newTimer);
	};

	useEffect(() => {
		let data = { personalDetails };
		handleInputData(data);
	}, [personalDetails]);

	return (
		<BlockContainer>
			<TitleBlock title={{ blockTitle, setBlockTitle }} />
			<BlockRow>
				<LeftCol>
					<InputTitle>求職職位</InputTitle>
					<ShortInput
						type="text"
						name="position"
						value={position}
						onChange={(e) => {
							setPosition(e.target.value);
						}}></ShortInput>
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
						value={lastName}
						onChange={(e) => {
							setLastName(e.target.value);
						}}></ShortInput>
				</LeftCol>
				<RightCol>
					<InputTitle>名字</InputTitle>
					<ShortInput
						type="text"
						name="firstName"
						value={firstName}
						onChange={(e) => {
							setFirstName(e.target.value);
						}}></ShortInput>
				</RightCol>
			</BlockRow>
			<BlockRow>
				<LeftCol>
					<InputTitle>電子郵件</InputTitle>
					<ShortInput
						type="text"
						name="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}></ShortInput>
				</LeftCol>
				<RightCol>
					<InputTitle>手機號碼</InputTitle>
					<ShortInput
						type="text"
						name="phone"
						value={phone}
						onChange={(e) => {
							setPhone(e.target.value);
						}}></ShortInput>
				</RightCol>
			</BlockRow>
			<MoreInput isClick={isClick}>
				<BlockRow>
					<LeftCol>
						<InputTitle>居住國家</InputTitle>
						<ShortInput
							type="text"
							name="country"
							value={country}
							onChange={(e) => {
								setCountry(e.target.value);
							}}></ShortInput>
					</LeftCol>
					<RightCol>
						<InputTitle>現居城市</InputTitle>
						<ShortInput
							type="text"
							name="city"
							value={city}
							onChange={(e) => {
								setCity(e.target.value);
							}}></ShortInput>
					</RightCol>
				</BlockRow>
				<BlockRow>
					<LeftCol>
						<InputTitle>通訊地址</InputTitle>
						<ShortInput
							type="text"
							name="address"
							value={address}
							onChange={(e) => {
								setAddress(e.target.value);
							}}></ShortInput>
					</LeftCol>
					<RightCol>
						<InputTitle>郵遞區號</InputTitle>
						<ShortInput
							type="text"
							name="postalCode"
							value={postalCode}
							onChange={(e) => {
								setPostalCode(e.target.value);
							}}></ShortInput>
					</RightCol>
				</BlockRow>
				<BlockRow>
					<LeftCol>
						<InputTitle>駕駛執照</InputTitle>
						<ShortInput
							type="text"
							name="drivingLicense"
							value={drivingLicense}
							onChange={(e) => {
								setDrivingLicense(e.target.value);
							}}></ShortInput>
					</LeftCol>
					<RightCol>
						<InputTitle>國籍</InputTitle>
						<ShortInput
							type="text"
							name="nationality"
							value={nationality}
							onChange={(e) => {
								setNationality(e.target.value);
							}}></ShortInput>
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
