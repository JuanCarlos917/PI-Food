import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { getRecipe } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import Filter from '../Filter/Filter';
import SearchBar from '../SearchBar/SearchBar';
export default function Home() {
	const dispatch = useDispatch();
	const allRecipes = useSelector((state) => state.recipes);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		dispatch(getRecipe()).then(() => setIsLoading(false));
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<nav className={styles.Nav}>
				<div className={styles.buttonLogout}>
					<Link
						to='/'
						className={({ isActive }) =>
							isActive ? styles.active : styles.disable
						}>
						<button id='buttonLogout' className={styles.btn}>
							Logout
						</button>
					</Link>
				</div>
				<div className={styles.buttonNewrecipe}>
					<Link
						to='/newrecipe'
						className={({ isActive }) =>
							isActive ? styles.active : styles.disable
						}>
						<button id='buttonCreate' className={styles.btn}>
							Create Recipe{' '}
						</button>
					</Link>
				</div>

				<div className={styles.searchBar}>
					<SearchBar />
				</div>
			</nav>
			<div className={styles.filter}>
				<Filter />
			</div>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : (
				<div className={styles.recipesContainer}>
					{allRecipes.length ? (
						<Pagination recipes={allRecipes} pageSize={9}>
							{({ currentRecipe }) =>
								currentRecipe.map((recipe, index) => (
									<Card
										image={recipe.image}
										title={recipe.title}
										diets={recipe.diets}
										healthScore={recipe.healthScore}
										summary={recipe.summary.replace(
											/<[^>]*>?/g,
											'',
										)}
										id={recipe.id}
										key={index}
									/>
								))
							}
						</Pagination>
					) : (
						<h2 className={styles.notFound}>
							No culinary recipes found
						</h2>
					)}
				</div>
			)}
		</div>
	);
}
