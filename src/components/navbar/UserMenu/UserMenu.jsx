import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";

import { auth } from "../../../utils/firebase/firebaseInit";

const UserArea = styled.div`
	width: 30px;
	height: 30px;
	border-radius: 30px;
	cursor: pointer;
	transition: all 0.3s;
	background-color: ${(props) => props.theme.color.neutral[10]};
	border: ${(props) => (props.isClickUser ? "2px solid #1a91f0" : "none")};
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;

	&:hover {
		transition: all 0.3s;
		border: 2px solid ${(props) => props.theme.color.blue[50]};
	}
`;

const UserDefaultPhoto = styled.img`
	width: 100%;
	opacity: 0.4;
`;

const UserPhoto = styled.img``;

const fadeIn = keyframes`
	0% { opacity: 0; scale:0; }
	100% { opacity: 1; scale:1;}
`;

const Options = styled.ul`
	list-style: none;
	position: absolute;
	top: 60px;
	right: 32px;
	list-style-type: none;
	width: 250px;
	height: auto;
	border: 1px solid ${(props) => props.theme.color.neutral[10]};
	border-radius: 10px;
	background-color: #fff;
	box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.15);
	animation: ${fadeIn} 0.3s forwards;
	z-index: 11;
`;

const Option = styled.li`
	${(props) => props.theme.font.lightButton};
	height: 50px;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	padding: 0px 15px;
	margin-left: ${(props) => (props.pageFrom === "edit" ? "40px" : "0")};
	transition: all 0.3s;

	&:before {
		content: "";
		display: none;
	}

	&:hover {
		transition: all 0.3s;
		color: ${(props) => props.theme.color.blue[50]};
	}
`;

const DashboardArea = styled.div`
	height: 70px;
	padding: 20px 15px;
	border-bottom: 1px solid ${(props) => props.theme.color.neutral[10]};
	transition: all 0.3s;
	display: flex;
	align-items: center;

	&:hover {
		transition: all 0.3s;
		color: ${(props) => props.theme.color.blue[50]};
	}
`;

const HomeIcon = styled.img`
	width: 20px;
	margin-right: 20px;
`;

const TextArea = styled.div``;

const Title = styled.div``;

const Info = styled.div`
	width: 100%;
	${(props) => props.theme.font.info};
	color: ${(props) => props.theme.color.neutral[40]};
	margin-top: 5px;
`;

UserMenu.propTypes = {
	pageFrom: PropTypes.string,
};

export default function UserMenu({ pageFrom }) {
	const navigate = useNavigate();
	const UserRef = useRef(null);
	const [isClickUser, setIsClickUser] = useState(false);
	const [style, setStyle] = useState({});
	const photoUrl = useSelector((state) => state.userInfo.photo);

	//當照片載入時，判斷照片的寬高，以最短邊作爲 50px 的比例進行照片尺寸調整
	useEffect(() => {
		const img = new Image();
		img.onload = () => {
			const imgRatio = img.width / img.height;
			if (img.width < img.height) {
				const newHeight = 30 / imgRatio;
				setStyle({ width: "30px", height: `${newHeight}px` });
			} else {
				const newWidth = 30 * imgRatio;
				setStyle({ width: `${newWidth}px`, height: "30px" });
			}
		};
		img.src = photoUrl;
	}, [photoUrl]);

	const handleUserClick = (e) => {
		setIsClickUser(!isClickUser);
		if (e.target.innerText === "Log Out") {
			handleSignOut();
		}
	};

	const handleSignOut = () => {
		signOut(auth)
			.then(() => {
				navigate("/");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleDashboardAreaClick = () => {
		navigate("/dashboard");
	};

	useEffect(() => {
		if (UserRef.current === null) {
			return;
		}
		window.addEventListener("click", (e) => {
			if (e.target === null) return;
			if (!UserRef.current.contains(e.target)) {
				setIsClickUser(false);
			}
		});
	}, [UserRef]);

	return (
		<UserArea
			ref={UserRef}
			onClick={handleUserClick}
			isClickUser={isClickUser}>
			{!photoUrl && <UserDefaultPhoto src="/images/icon/user.png" />}
			{photoUrl && <UserPhoto src={photoUrl} style={style} />}
			{isClickUser && (
				<Options>
					{pageFrom === "edit" && (
						<DashboardArea onClick={handleDashboardAreaClick}>
							<HomeIcon src="/images/icon/home.png" />
							<TextArea>
								<Title>Dashboard</Title>
								<Info>Your resumes are here</Info>
							</TextArea>
						</DashboardArea>
					)}
					<Option pageFrom={pageFrom}>Log Out</Option>
				</Options>
			)}
		</UserArea>
	);
}
