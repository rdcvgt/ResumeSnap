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
import Education from "./Education";
import EmploymentHistory from "./EmploymentHistory";

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
	inputData: PropTypes.array,
};

export default function London({ inputData }) {
	const componentRef = useRef();

	//初始化或當 block 內容改變時，呼叫 handlePreviewChange;
	useEffect(() => {
		handlePreviewChange();
	}, [inputData]);

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

	const components = {
		PersonalDetails: PersonalDetails,
		ProfessionalSummary: ProfessionalSummary,
		Education: Education,
		EmploymentHistory: EmploymentHistory,
	};

	const RenderBlocks = () => {
		return inputData.map((block, index) => {
			const BlockName = block.block;
			const data = block.content;
			const Component = components[BlockName];
			if (!Component) return null;
			return <Component data={data} key={index} />;
		});
	};

	return (
		<>
			{imgUrl && <Img src={imgUrl} alt="圖片" />}
			{
				<Hide>
					<Root ref={componentRef}>
						<ResumeContainer>
							<RenderBlocks />
						</ResumeContainer>
					</Root>
				</Hide>
			}
		</>
	);
}
