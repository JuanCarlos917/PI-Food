import React, { useState } from 'react';
import styles from './Pagination.module.css';

function Pagination(props) {
	const { recipes, pageSize } = props;
	const [currentPage, setCurrentPage] = useState(1);
	const pageCount = Math.ceil(recipes.length / pageSize);

	function handlePageClick(page) {
		setCurrentPage(page);
		props.onPageChange(page);
	}

	return (
		<div className={styles.pageBtnContainer}></div>
			{currentPage > 1 && (
				<button
					onClick={() => handlePageClick(currentPage - 1)}
					className={styles.btnPage}>
					{'<'}
				</button>
			)}

			{Array.from({ length: pageCount }).map((_, index) => (
				<button
					key={index}
					onClick={() => handlePageClick(index + 1)}
					className={`${
						currentPage === index + 1
							? styles.btnPageActive
							: styles.btnPage
					}`}>
					{index + 1}
				</button>
			))}

			{currentPage < pageCount && (
				<button
					onClick={() => handlePageClick(currentPage + 1)}
					className={styles.btnPage}>
					{'>'}
				</button>
			)}
		</div>
	);
}

export default Pagination;
