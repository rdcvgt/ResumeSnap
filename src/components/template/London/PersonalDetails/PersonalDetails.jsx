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
	margin-bottom: 15px;
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
	data: PropTypes.object,
	blockId: PropTypes.string,
	handleBlockHeight: PropTypes.func,
};

export default function PersonalDetails({ data, blockId, handleBlockHeight }) {
	const resumeContainerRef = useRef(null);
	useEffect(() => {
		if (resumeContainerRef.current) {
			const containerHeight = resumeContainerRef.current.clientHeight;
			if (handleBlockHeight) {
				handleBlockHeight({ id: blockId, height: containerHeight });
			}
		}
	}, [data]);

	let address = data?.formData?.address;
	let city = data?.formData?.city;
	let country = data?.formData?.country;
	let drivingLicense = data?.formData?.drivingLicense;
	let email = data?.formData?.email;
	let firstName = data?.formData?.firstName;
	let lastName = data?.formData?.lastName;
	let nationality = data?.formData?.nationality;
	let phone = data?.formData?.phone;
	let position = data?.formData?.position;
	let postalCode = data?.formData?.postalCode;
	const space = "\u00A0";

	return (
		<ResumeContainer ref={resumeContainerRef}>
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
								<div>駕駛執照</div>
								<div>{drivingLicense}</div>
							</DrivingLicense>
						)}
						{nationality && (
							<Nationality>
								<div>國籍</div>
								<div>{nationality}</div>
							</Nationality>
						)}
					</MorePersonalDetails>
				</Block>
			)}
		</ResumeContainer>
	);
}
