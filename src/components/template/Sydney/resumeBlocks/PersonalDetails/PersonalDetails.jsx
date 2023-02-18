import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.div`
	font-family: "PT Sans Narrow", sans-serif;
	font-size: 20px;
	overflow-wrap: break-word;
	color: #fff;
`;
const Block = styled.div`
	font-family: "Open Sans", sans-serif;
	margin-top: 15px;
	overflow-wrap: break-word;
	color: #fff;
`;

const BlockTitle = styled.div`
	font-family: "Open Sans", sans-serif;
	opacity: 0.5;
	font-size: 9px;
	text-transform: uppercase;
	overflow-wrap: break-word;
	color: #fff;
`;

const Item = styled.div`
	font-family: "Open Sans", sans-serif;
	font-size: 9px;
	font-weight: 300;
	margin-top: 10px;
	overflow-wrap: break-word;
	color: #fff;
`;

const MarginBottom = styled.div`
	margin-bottom: 40px;
`;

PersonalDetails.propTypes = {
	content: PropTypes.object,
};

export default function PersonalDetails({ content }) {
	const inputData = content.inputData;
	const address = inputData?.address;
	const city = inputData?.city;
	const country = inputData?.country;
	const drivingLicense = inputData?.drivingLicense;
	const email = inputData?.email;
	const nationality = inputData?.nationality;
	const phone = inputData?.phone;
	const postalCode = inputData?.postalCode;

	return (
		<>
			{(address ||
				city ||
				country ||
				drivingLicense ||
				email ||
				nationality ||
				postalCode) && (
				<div>
					<Title>Details</Title>
					<Item>{address}</Item>
					<Item>
						{city}
						{city && postalCode && ", "}
						{postalCode}
					</Item>
					<Item>{country}</Item>
					<Item>{phone}</Item>
					<Item>{email}</Item>
					{nationality && (
						<Block>
							<BlockTitle>Nationality</BlockTitle>
							<Item>{nationality}</Item>
						</Block>
					)}
					{drivingLicense && (
						<Block>
							<BlockTitle>Driving License</BlockTitle>
							<Item>{drivingLicense}</Item>
						</Block>
					)}
					<MarginBottom />
				</div>
			)}
		</>
	);
}
