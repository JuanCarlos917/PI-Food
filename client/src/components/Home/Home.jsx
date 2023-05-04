import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import loading from '../../assets/img.png';
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
			<nav className={styles.nav}>
				<div className={styles.navLinks}>
					<div className={styles.linkHome}>
						<Link
							to='/newrecipe'
							className={styles.createRecipeLink}>
							<button
								id='buttonCreate'
								className={styles.createRecipeBtn}>
								Create Recipe
							</button>
						</Link>
						<Link to='/' className={styles.logoutLink}>
							<button
								id='buttonLogout'
								className={styles.logoutBtn}>
								Logout
							</button>
						</Link>
					</div>
					<div className={styles.searchBar}>
						<SearchBar />
					</div>
				</div>
			</nav>
			<div className={styles.filterContainer}>
				<Filter />
			</div>
			{isLoading ? (
				<div className={styles.loading}>
					<img src={loading} alt='Loading...' />
				</div>
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
						<h2 className={styles.noRecipesFound}>
							No culinary recipes found
						</h2>
					)}
				</div>
			)}
		</div>
	);
}
