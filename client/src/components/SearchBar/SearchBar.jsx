import React from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../redux/actions'
import styles from './SearchBar.module.css';

export default function SearchBar() {
    const dispatch = useDispatch();

    function handleChange(e) {
        dispatch(actions.getRecipeByName(e.target.value));
    }

    return (
		<div className={styles.searchBar}>
			<input
				className={styles.input}
				type='text'
				placeholder='Search for a recipe...'
				onChange={(e) => handleChange(e)}
			/>
		</div>
	);
}