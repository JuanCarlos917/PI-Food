import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import loading from '../../assets/img.png';
import * as actions from '../../redux/actions';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';

export default function Home() {
	const dispatch = useDispatch();
	const allRecipes = useSelector((state) => state.recipes);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		dispatch(actions.getRecipe()).then(() => setIsLoading(false));
	}, [dispatch]);

	function handleClick(e) {
		//para resetear las recetas
		e.preventDefault(); //para que no se rompa
		dispatch(actions.resetFilter());
	}

	return (
		<div className={styles.background}>
			<nav className={styles.Nav}>
				<div className={styles.navLink}>
					<div className={styles.linkHome}>
						<Link
							to='/recipe'
							className={({ isActive }) =>
								isActive ? styles.active : styles.disable
							}>
							<button id='buttonCreate' className={styles.btn}>
								Create Recipe{' '}
							</button>
						</Link>

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

					<div>
						<div>
							<button
								onClick={(e) => {
									handleClick(e);
								}}
								className={styles.btn}>
								Reset Filters
							</button>
						</div>
					</div>
				</div>
			</nav>

			{isLoading ? (
				<div className={styles.loading}>
					<img src={loading} alt='Loading...' />
				</div>
			) : (
				<div className={styles.recipesContainer}>
					{allRecipes.length ? (
						<Pagination recipes={allRecipes} pageSize={9}>
							{({ currentRecipe }) =>
								currentRecipe.map((recipe) => (
									<Card
										image={recipe.image}
										title={recipe.title}
										diets={recipe.diets}
										healthScore={recipe.healthScore}
										id={recipe.id}
									/>
								))
							}
						</Pagination>
					) : (
						<h2 className={styles.noHayTarjetas}>
							No hay <br />
							Delicias Culinarias
						</h2>
					)}
				</div>
			)}
		</div>
	);
}
