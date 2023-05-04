import React from 'react';
import styles from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { filterTypeDiet, filterOrigin, orderCards } from '../../redux/actions';

export default function Filter() {
	const dispatch = useDispatch();

	function handleFilteredByDiets(e) {
		e.preventDefault();
		dispatch(filterTypeDiet(e.target.value));
	}

	function handleFilteredCreated(e) {
		e.preventDefault();
		dispatch(filterOrigin(e.target.value));
	}

	function handleOrderByName(e) {
		e.preventDefault();
		dispatch(orderCards(e.target.value));
	}

	function handleOrderByHealth(e) {
		e.preventDefault();
		dispatch(orderCards(e.target.value));
	}

	return (
		<nav className={styles.filterNav}>
			<label htmlFor='orderByName' className={styles.filterLabel}>
				Order by Title:
			</label>
			<select
				id='orderByName'
				onChange={handleOrderByName}
				className={styles.filterSelect}
				defaultValue='0'>
				<option disabled value='0'>
					Select order
				</option>
				<option value='a-z'>A-Z</option>
				<option value='z-a'>Z-A</option>
			</select>

			<label htmlFor='orderByHealth' className={styles.filterLabel}>
				Order by Health Score:
			</label>
			<select
				id='orderByHealth'
				onChange={handleOrderByHealth}
				className={styles.filterSelect}
				defaultValue='0'>
				<option disabled value='0'>
					Select order
				</option>
				<option value='1-9'>Ascending Health Score</option>
				<option value='9-1'>Descending Health Score</option>
			</select>

			<label htmlFor='filteredByDiets' className={styles.filterLabel}>
				Filter by Type Diet:
			</label>
			<select
				id='filteredByDiets'
				onChange={handleFilteredByDiets}
				className={styles.filterSelect}
				defaultValue='0'>
				<option disabled value='0'>
					Select type of diet
				</option>
				<option value='All'>All Recipes</option>
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

			<label htmlFor='filteredCreated' className={styles.filterLabel}>
				Filter by Origin:
			</label>
			<select
				id='filteredCreated'
				onChange={handleFilteredCreated}
				className={styles.filterSelect}
				defaultValue='0'>
				<option disabled value='0'>
					Select origin
				</option>
				<option value='All'>All</option>
				<option value='Db'>created in the database</option>
				<option value='Api'>API</option>
			</select>
		</nav>
	);
}
