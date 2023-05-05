import React, { useEffect, useState } from 'react';
import styles from './Detail.module.css';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipeByDetail } from '../../redux/actions';

export default function Detail() {
	const { title, diets, summary, healthScore, image, steps } = useSelector(
		(state) => state.newRecipes,
	);
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
		<div className={styles.containerDetail}>
			<main>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					<div className={styles.recipeContainer}>
						<header className={styles.recipeHeader}>
							<h1 className={styles.recipeTilteH1}>{title}</h1>
						</header>

						<section className={styles.recipeDetails}>
							<div className={styles.recipeInfo}>
								<div className={styles.recipeDiets}>
									<h3 className={styles.recipeTiltes}>
										Diets
									</h3>
									<ul className={styles.recipeUl}>
										{diets ? (
											diets.map((diet, index) => (
												<li key={index}>{diet.name}</li>
											))
										) : (
											<h1
												className={
													styles.recipeTilteH1
												}>
												No diets found
											</h1>
										)}
									</ul>
								</div>

								<div className={styles.recipeSummary}>
									<h2 className={styles.recipeTiltes}>
										Summary
									</h2>
									<p>
										{summary && removerCaracteres(summary)}
									</p>
								</div>

								<div className={styles.recipeHealthScore}>
									<h2 className={styles.recipeTiltes}>
										Health Score
									</h2>
									<p className={styles.recipeHealthScore}>
										{healthScore}
									</p>
								</div>
							</div>

							<div className={styles.recipeImage}>
								<img
									src={image}
									alt=''
									className={styles.recipeImg}
								/>
							</div>
						</section>

						<section className={styles.recipeSteps}>
							<h2 className={styles.recipeStepsH2}>Steps:</h2>
							<div className={styles.recipeStepList}>
								<p>
									{steps &&
										steps.map((e, index) => (
											<p key={index}>
												{e.number}: {e.step}
											</p>
										))}
								</p>
							</div>
						</section>
					</div>
				)}
			</main>
			<section className={styles.recipeBackToHome}>
				<Link to={'/home'}>
					<button className={styles.backButton}>
						<span className={styles.backButtonSpan}>
							Back to home
						</span>
					</button>
				</Link>
			</section>
		</div>
	);
}
