import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import PersonalDetails from "./PersonalDetails";
import ProfessionalSummary from "./ProfessionalSummary";

const Root = styled.div`
	width: 210mm;
	height: 297mm;
	background-color: #fff;
	border: 1px solid #ccc;
`;

const ResumeContainer = styled.div`
	width: 100%;
	height: 100%;
	padding: 50px;
`;

London.propTypes = {
	inputData: PropTypes.object,
};

export default function London({ inputData }) {
	const [personalDetails, setPersonalDetails] = useState(null);
	const [professionalSummary, setProfessionalSummary] = useState(null);
	if (
		inputData.personalDetails &&
		personalDetails !== inputData.personalDetails
	) {
		setPersonalDetails(inputData.personalDetails);
	}

	if (
		inputData.professionalSummary &&
		professionalSummary !== inputData.professionalSummary
	) {
		setProfessionalSummary(inputData.professionalSummary);
	}

	return (
		<Root>
			<ResumeContainer>
				<PersonalDetails inputData={personalDetails} />
				<ProfessionalSummary inputData={professionalSummary} />
			</ResumeContainer>
		</Root>
	);
}
