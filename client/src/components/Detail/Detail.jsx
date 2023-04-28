import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Detail.module.css';
import { useSelector } from 'react-redux';

export default function Detail() {
	const [recipe, setRecipe] = useState({});
	const recipeDetail = useSelector((state) => state.newRecipes);

	useEffect(() => {
		setRecipe(recipeDetail);
	}, [recipeDetail]);

	return (
		<div className={styles.card}>
			<div className={styles.card__header}>
				<img src={recipe.image} alt={recipe.title} />
			</div>
			<div className={styles.card__body}>
				<h3 className={styles.card__title}>{recipe.title}</h3>
				<div className={styles.card__diets}>
					<p className={styles.card__P}>
						{recipe.diets?.map((diet) => (
							<span key={diet.name} className={styles.card__diet}>
								{diet.name}
							</span>
						))}
					</p>
				</div>
				<div className={styles.card__healthScore}>
					<span>Health Score: {recipe.healthScore}</span>
				</div>
			</div>
			<Link to={'/home'}>
				<button className={styles.card__button}>Back</button>
			</Link>
		</div>
	);
}
