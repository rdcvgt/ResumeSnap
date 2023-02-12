import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ResumeContainer = styled.div`
	width: 100%;
	height: auto;
`;

const TopBlock = styled.div`
	margin-bottom: 25px;
	width: 100%;
`;

const Block = styled.div`
	height: auto;
	border-top: 1px solid #000;
	padding-top: 15px;
	margin-bottom: 10px;
`;

const TitleBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding-bottom: 10px;
	font-weight: 700;
	font-size: 16px;
`;

const Name = styled.div`
	text-align: center;
`;

const Position = styled.div`
	text-align: center;
`;

const SubTitleBlock = styled.div`
	text-align: center;
	font-size: 10px;
	display: flex;
	justify-content: center;
`;

const PostalCode = styled.div``;

const Address = styled.div``;

const Phone = styled.div``;

const City = styled.div``;

const Country = styled.div``;

const Email = styled.div``;

const MorePersonalDetails = styled.div`
	display: flex;
	font-size: 10px;
	justify-content: space-between;
`;

const DrivingLicense = styled.div`
	width: 45%;
	display: flex;
	justify-content: space-between;
`;
const Nationality = styled.div`
	width: 45%;
	display: flex;
	justify-content: space-between;
`;

PersonalDetails.propTypes = {
	content: PropTypes.object,
};

export default function PersonalDetails({ content }) {
	const inputData = content.inputData;
	let address = inputData?.address;
	let city = inputData?.city;
	let country = inputData?.country;
	let drivingLicense = inputData?.drivingLicense;
	let email = inputData?.email;
	let firstName = inputData?.firstName;
	let lastName = inputData?.lastName;
	let nationality = inputData?.nationality;
	let phone = inputData?.phone;
	let position = inputData?.position;
	let postalCode = inputData?.postalCode;
	const space = "\u00A0";

	return (
		<ResumeContainer>
			<TopBlock>
				<TitleBlock>
					<Name>
						{lastName}
						{firstName && lastName ? space : ""}
						{firstName}
					</Name>
					{(firstName || lastName) && position
						? `${space}-${space}`
						: ""}
					<Position>{position}</Position>
				</TitleBlock>
				<SubTitleBlock>
					<Address>{address}</Address>
					{!address ||
					!(postalCode || city || country || phone || email)
						? ""
						: `,${space}`}
					<PostalCode>{postalCode}</PostalCode>
					{!postalCode || !(city || country || phone || email)
						? ""
						: `,${space}`}
					<City>{city}</City>
					{!city || !(country || phone || email) ? "" : `,${space}`}
					<Country>{country}</Country>
					{!country || !(phone || email) ? "" : `,${space}`}
					<Phone>{phone}</Phone>
					{!phone || !email ? "" : `,${space}`}
					<Email>{email}</Email>
				</SubTitleBlock>
			</TopBlock>
			{(drivingLicense || nationality) && (
				<Block>
					<MorePersonalDetails>
						{drivingLicense && (
							<DrivingLicense>
								<div>Driving License</div>
								<div>{drivingLicense}</div>
							</DrivingLicense>
						)}
						{nationality && (
							<Nationality>
								<div>Nationality</div>
								<div>{nationality}</div>
							</Nationality>
						)}
					</MorePersonalDetails>
				</Block>
			)}
		</ResumeContainer>
	);
}
