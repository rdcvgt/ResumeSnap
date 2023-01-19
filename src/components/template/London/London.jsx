import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	dangerouslySetInnerHTML,
} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import PersonalDetails from "./PersonalDetails";
import ProfessionalSummary from "./ProfessionalSummary";
import "../utils/htmlElement.css";

import html2canvas from "html2canvas";

const Img = styled.img`
	width: 100%;
	height: 100%;
`;

const Hide = styled.div`
	opacity: 0;
`;
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

	const componentRef = useRef();

	//用於 html2canvas
	const [imgUrl, setImgUrl] = useState("");

	// png
	const handleButtonClick = () => {
		html2canvas(componentRef.current).then((canvas) => {
			let imgUrl = canvas.toDataURL();
			setImgUrl(imgUrl);
		});
	};

	useEffect(() => {
		if (personalDetails === null || professionalSummary === null) {
			return;
		}
		handleButtonClick();
	}, [personalDetails, professionalSummary]);

	useEffect(() => {
		handleButtonClick();
	}, []);

	return (
		<>
			{imgUrl && <Img src={imgUrl} alt="圖片" />}
			{
				<Hide>
					<Root ref={componentRef}>
						<ResumeContainer>
							<PersonalDetails inputData={personalDetails} />
							<ProfessionalSummary
								inputData={professionalSummary}
							/>
						</ResumeContainer>
					</Root>
				</Hide>
			}
		</>
	);
}
