import React, { useState } from 'react';
import styles from './Pagination.module.css';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';

export default function Pagination({ recipes, pageSize, children }) {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const pageCount = Math.ceil(recipes.length / pageSize);
	const indexOfLastRecipe = currentPage * pageSize;
	const indexOfFirstRecipe = indexOfLastRecipe - pageSize;

	function handlePageClick(page) {
		setCurrentPage(page);
	}

	function handleResetFilters(e) {
		e.preventDefault();
		dispatch(actions.resetFilter());
		setCurrentPage(1);
	}

	return (
		<div>
			<div className={styles.pageBtnContainer}>
				<div>
					<button onClick={handleResetFilters} className={styles.btn}>
						Reset Filters
					</button>
				</div>

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
		</div>
	);
}
