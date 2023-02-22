import uuid from "react-uuid";
import { Timestamp } from "firebase/firestore";

function newResumeStructure(userInfo) {
	const timestamp = Timestamp.now().toMillis();
	const { email, firstName, lastName } = userInfo;
	const defaultResume = {
		updatedAt: timestamp,
		resumeName: "First Resume",
		template: "Sydney",
		color: "#082A4D",
		formBlocks: [
			{
				block: "PersonalDetails",
				content: {
					blockTitle: "Personal Details",
					inputData: { email, firstName, lastName },
				},
				id: uuid(),
			},
			{
				block: "ProfessionalSummary",
				content: {
					blockTitle: "Profile",
					inputData: {},
				},
				id: uuid(),
			},
			{
				block: "Education",
				content: {
					blockTitle: "Education",
					itemData: [],
				},
				id: uuid(),
			},
			{
				block: "EmploymentHistory",
				content: {
					blockTitle: "Employment History",
					itemData: [],
				},
				id: uuid(),
			},
			{
				block: "WebsiteLink",
				content: {
					blockTitle: "Websites & Social Links",
					itemData: [],
				},
				id: uuid(),
			},
		],
	};
	return defaultResume;
}

export default newResumeStructure;
