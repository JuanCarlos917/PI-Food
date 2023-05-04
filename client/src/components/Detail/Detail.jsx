import React, { useEffect, useState } from 'react';
import styles from './Detail.module.css';
import loading from '../../assets/img.png';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipeByDetail } from '../../redux/actions';

export default function Detail() {
	const { title, diets, summary, healthScore, image, steps } =
		useSelector((state) => state.newRecipes);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const { id: recipeId } = useParams();

	useEffect(() => {
		dispatch(getRecipeByDetail(recipeId));
		setIsLoading(false);
	}, [dispatch, recipeId]);

	const removerCaracteres = (str) => {
		if (!str) return false;
		return str.toString().replace(/(<([^>]+)>)/gi, '');
	};

	return (
		<main>
			{isLoading ? (
				<div className={styles.loading}>
					<img src={loading} alt='Loading...' />
				</div>
			) : (
				<div className={styles.recipeContainer}>
					<header className={styles.recipeHeader}>
						<h1>{title}</h1>
					</header>

					<section className={styles.recipeDetails}>
						<div className={styles.recipeInfo}>
							<div className={styles.recipeDiets}>
								<ul>
									{diets ? (
										diets.map((diet, index) => (
											<li key={index}>{diet.name}</li>
										))
									) : (
										<li>No diets found</li>
									)}
								</ul>
							</div>

							<div className={styles.recipeSummary}>
								<h2>Summary</h2>
								<p>{summary && removerCaracteres(summary)}</p>
							</div>

							<div className={styles.recipeHealthScore}>
								<h2>Health Score</h2>
								<p>{healthScore}</p>
							</div>
						</div>

						<div className={styles.recipeImage}>
							<img src={image} alt='' />
						</div>
					</section>

					<section className={styles.recipeSteps}>
						<h2>Steps:</h2>
						<div className={styles.recipeStepList}>
							<ul>
								{steps &&
									steps.map((e, index) => (
										<li key={index}>
											{e.number}: {e.step}
										</li>
									))}
							</ul>
						</div>
					</section>

					<section className={styles.recipeBackToHome}>
						<Link to={'/home'} className={styles.backButton}>
							Back to home
						</Link>
					</section>
				</div>
			)}
		</main>
	);
}
