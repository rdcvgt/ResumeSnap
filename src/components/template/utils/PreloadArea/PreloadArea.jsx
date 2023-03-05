import React from "react";
import styled, { keyframes } from "styled-components";

const skeletonLoading = keyframes`
	0%{
			background-color: #d9deeb;
	}
	100%{
		background-color: hsl(200, 20%, 95%)
	}

`;

const Preload = styled.div`
	position: relative;
	top: 0%;
	padding: 80px;
	display: flex;
	justify-content: center;
`;

const Skeleton = styled.div`
	width: 90%;
	display: flex;
	flex-wrap: wrap;
`;

const SkeletonText = styled.div`
	width: 100%;
	height: 0.7rem;
	border-radius: 0.125rem;
	margin-bottom: 30px;
	animation: ${skeletonLoading} 1s linear infinite alternate;

	&:nth-last-child(1) {
		width: 70%;
	}
`;

export default function PreloadArea() {
	return (
		<>
			<Preload>
				<Skeleton>
					<SkeletonText />
					<SkeletonText />
					<SkeletonText />
					<SkeletonText />
					<SkeletonText />
					<SkeletonText />
					<SkeletonText />
					<SkeletonText />
				</Skeleton>
			</Preload>
		</>
	);
}
