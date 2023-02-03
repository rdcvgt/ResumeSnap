import { useEffect } from "react";

export default function usePagination(
	renderContainerRef,
	setBlocks,
	inputData
) {
	/*計算組件、頁面高度與換頁邏輯 */
	useEffect(() => {
		//確認選取到 renderResume 元素
		const renderResume = renderContainerRef.current;
		if (!renderResume) return;

		//確認 renderResume 中已有子節點
		const firstChild = renderResume.children[0];
		if (!firstChild) return;

		const resumeBlock = renderResume.children;
		//每頁會渲染的 html element 會依序儲存在 newBlocks 索引中的陣列
		let newBlocks = [];
		let currentPage = 0;
		let currentHeight = 0;
		const maxPageHeight = 1020;

		//resumeBlock 爲 html collection，需使用解構，每個索引代表每個表單 block
		[...resumeBlock].forEach((block) => {
			const blockItems = block.children;

			//blockItems 爲 html collection，需使用解構，每個索引代表該表單渲染在畫面中的每個子元素
			[...blockItems].forEach((item) => {
				//計算每個 item 最底部的高度
				const itemBottomHeight =
					item.offsetTop - renderResume.offsetTop + item.offsetHeight;

				//如果超過，則頁數 +1 且 currentHeight 疊加 maxPageHeight
				if (currentHeight + maxPageHeight < itemBottomHeight) {
					currentPage++;
					currentHeight += maxPageHeight;
				}

				//爲新頁數創建陣列
				if (newBlocks[currentPage] === undefined) {
					newBlocks.push([]);
				}

				//將 item 依序加入指定頁面的陣列中，並轉換爲字串形式，以方便後續 render
				newBlocks[currentPage].push(item.outerHTML);
			});
		});
		setBlocks(newBlocks);
	}, [inputData, renderContainerRef, setBlocks]);
}
