import React, { useState } from 'react';
import styles from './Pagination.module.css';

export default function Pagination({ recipes, pageSize, children }) {
	const [currentPage, setCurrentPage] = useState(1);
	const pageCount = Math.ceil(recipes.length / pageSize);
	const indexOfLastRecipe = currentPage * pageSize;
	const indexOfFirstRecipe = indexOfLastRecipe - pageSize;

	function handlePageClick(page) {
		setCurrentPage(page);
	}

	return (
		<>
			<div className={styles.pageBtnContainer}>
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
						{' '}
						{'>'}{' '}
					</button>
				)}
			</div>
			{children({
				currentRecipe: recipes.slice(
					indexOfFirstRecipe,
					indexOfLastRecipe,
				),
			})}
		</>
	);
}
