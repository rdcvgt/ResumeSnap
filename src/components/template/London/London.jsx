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

	//判斷 inputData 中的 block
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

	//初始化或當 block 內容改變時，呼叫 handlePreviewChange;
	useEffect(() => {
		if (personalDetails === null || professionalSummary === null) {
			return;
		}
		handlePreviewChange();
	}, [personalDetails, professionalSummary]);

	useEffect(() => {
		handlePreviewChange();
	}, []);

	//將履歷內容轉換成 png 檔並儲存到 state
	const [imgUrl, setImgUrl] = useState("");
	const handlePreviewChange = () => {
		html2canvas(componentRef.current).then((canvas) => {
			let imgUrl = canvas.toDataURL();
			setImgUrl(imgUrl);
		});
	};

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
