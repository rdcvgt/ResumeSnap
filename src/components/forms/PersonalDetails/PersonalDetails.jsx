import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import UploadPhotoArea from "./UploadPhotoArea";
import TitleBlock from "../utils/TitleBlock";
import { updateInputData } from "../../../redux/reducers/formDataReducer";

import {
	BlockRowStyle,
	InputTitleStyle,
	ShortInputStyle,
	MoreInputStyle,
	LeftColStyle,
	RightColStyle,
} from "../utils/form.style";

const BlockContainer = styled.div`
	width: 90%;
	height: auto;
	margin: 50px auto;
`;

const BlockRow = styled.div`
	${BlockRowStyle}
`;

const LeftCol = styled.div`
	${LeftColStyle}
`;

const RightCol = styled.div`
	${RightColStyle}
`;

const InputTitle = styled.div`
	${InputTitleStyle}
`;

const ShortInput = styled.input`
	${ShortInputStyle};
`;

const MoreInput = styled.div`
	${MoreInputStyle}
	padding: 0;
`;

const AdditionalButton = styled.div`
	display: inline-block;
	color: ${(props) => props.theme.color.blue[50]};
	${(props) => props.theme.font.infoBold};
	cursor: pointer;
`;

PersonalDetails.propTypes = {
	blockId: PropTypes.string,
};

export default function PersonalDetails({ blockId }) {
	const [isClick, setIsClick] = useState(false);
	const dispatch = useDispatch();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		dispatch(
			updateInputData({
				blockName: "PersonalDetails",
				inputTitle: name,
				inputValue: value,
			})
		);
	};

	const [blockData] = useSelector((state) =>
		state.formData.formBlocks.filter((block) => block.id === blockId)
	);

	const blockTitle = blockData.content.blockTitle || "";
	const inputData = blockData.content.inputData;
	const position = inputData.position || "";
	const firstName = inputData.firstName || "";
	const lastName = inputData.lastName || "";
	const email = inputData.email || "";
	const phone = inputData.phone || "";
	const country = inputData.country || "";
	const city = inputData.city || "";
	const address = inputData.address || "";
	const postalCode = inputData.postalCode || "";
	const drivingLicense = inputData.drivingLicense || "";
	const nationality = inputData.nationality || "";
	const photoUrl = inputData.photo?.url || "";
	const photoName = inputData.photo?.name || "";

	return (
		<BlockContainer>
			<TitleBlock
				blockTitle={blockTitle}
				blockId={blockId}
				hideDraggableIcon={true}
				hideDeleteIcon={true}
			/>
			<form>
				<BlockRow>
					<LeftCol>
						<InputTitle>Wanted Job Title</InputTitle>
						<ShortInput
							type="text"
							name="position"
							value={position}
							onChange={handleInputChange}></ShortInput>
					</LeftCol>
					<RightCol>
						<UploadPhotoArea
							photoUrl={photoUrl}
							photoName={photoName}
						/>
					</RightCol>
				</BlockRow>
				<BlockRow>
					<LeftCol>
						<InputTitle>First Name</InputTitle>
						<ShortInput
							type="text"
							name="firstName"
							value={firstName}
							onChange={handleInputChange}></ShortInput>
					</LeftCol>
					<RightCol>
						<InputTitle>Last Name</InputTitle>
						<ShortInput
							type="text"
							name="lastName"
							value={lastName}
							onChange={handleInputChange}></ShortInput>
					</RightCol>
				</BlockRow>
				<BlockRow>
					<LeftCol>
						<InputTitle>Email</InputTitle>
						<ShortInput
							type="text"
							name="email"
							value={email}
							onChange={handleInputChange}></ShortInput>
					</LeftCol>
					<RightCol>
						<InputTitle>Phone</InputTitle>
						<ShortInput
							type="text"
							name="phone"
							value={phone}
							onChange={handleInputChange}></ShortInput>
					</RightCol>
				</BlockRow>
				<MoreInput isClick={isClick}>
					<BlockRow>
						<LeftCol>
							<InputTitle>Country</InputTitle>
							<ShortInput
								type="text"
								name="country"
								value={country}
								onChange={handleInputChange}></ShortInput>
						</LeftCol>
						<RightCol>
							<InputTitle>City</InputTitle>
							<ShortInput
								type="text"
								name="city"
								value={city}
								onChange={handleInputChange}></ShortInput>
						</RightCol>
					</BlockRow>
					<BlockRow>
						<LeftCol>
							<InputTitle>Address</InputTitle>
							<ShortInput
								type="text"
								name="address"
								value={address}
								onChange={handleInputChange}></ShortInput>
						</LeftCol>
						<RightCol>
							<InputTitle>Postal Code</InputTitle>
							<ShortInput
								type="text"
								name="postalCode"
								value={postalCode}
								onChange={handleInputChange}></ShortInput>
						</RightCol>
					</BlockRow>
					<BlockRow>
						<LeftCol>
							<InputTitle>Driving License</InputTitle>
							<ShortInput
								type="text"
								name="drivingLicense"
								value={drivingLicense}
								onChange={handleInputChange}></ShortInput>
						</LeftCol>
						<RightCol>
							<InputTitle>Nationality</InputTitle>
							<ShortInput
								type="text"
								name="nationality"
								value={nationality}
								onChange={handleInputChange}></ShortInput>
						</RightCol>
					</BlockRow>
				</MoreInput>
			</form>
			<AdditionalButton
				onClick={() => {
					setIsClick(!isClick);
				}}>
				{isClick === true ? "Hide " : "Edit "}additional details
			</AdditionalButton>
		</BlockContainer>
	);
}
