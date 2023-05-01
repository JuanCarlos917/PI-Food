import React from 'react';
import styles from './Filter.module.css';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';

export default function Filter() {
	const dispatch = useDispatch();

	function handleFilteredByDiets(e) {
		e.preventDefault();
		dispatch(actions.filterTypeDiet(e.target.value));
	}

	function handleFilteredCreated(e) {
		e.preventDefault();
		dispatch(actions.filterOrigin(e.target.value));
	}

	function handleOrderByName(e) {
		e.preventDefault();
		dispatch(actions.orderCards(e.target.value));
	}

	function handleOrderByHealth(e) {
		e.preventDefault();
		dispatch(actions.orderCards(e.target.value));
	}

	return (
		<div className={styles.selectsContainer}>
			<select
				id='orderByName'
				onChange={handleOrderByName}
				className={styles.input}
				defaultValue='0'>
				<option disabled value='0'>
					Order by Title
				</option>
				<option value='a-z'> (A-Z)</option>
				<option value='z-a'> (Z-A)</option>
			</select>

			<select
				id='orderByHealth'
				onChange={handleOrderByHealth}
				className={styles.input}
				defaultValue='0'>
				<option disabled value='0'>
					Order by Health Score
				</option>
				<option value='1-9'>Ascending Health Score</option>
				<option value='9-1'>Descending Health Score</option>
			</select>

			<select
				id='filteredByDiets'
				onChange={handleFilteredByDiets}
				className={styles.input}
				defaultValue='0'>
				<option disabled value='0'>
					Filter by Type Diet
				</option>
				<option value='All'>(All Recipes)</option>
				<option value='gluten free'>Gluten free</option>
				<option value='dairy free"'>Dairy free</option>
				<option value='ketogenic'>Ketogenic</option>
				<option value='lacto ovo vegetarian'>
					Lacto ovo vegetarian
				</option>
				<option value='vegan'>Vegan</option>
				<option value='pescatarian'>Pescatarian</option>
				<option value='paleolithic'>Paleolithic</option>
				<option value='primal'>Primal</option>
				<option value='fodmap friendly'>Fodmap friendly</option>
				<option value='whole 30'>Whole 30</option>
			</select>

			<select
				id='filteredCreated'
				onChange={handleFilteredCreated}
				className={styles.input}
				defaultValue='0'>
				<option disabled value='0'>
					Filter by Origin
				</option>
				<option value='All'>All</option>
				<option value='Db'>Created</option>
				<option value='Api'>API</option>
			</select>
		</div>
	);
}
