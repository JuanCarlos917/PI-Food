import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import { useDispatch } from 'react-redux';
import { getRecipeByDetail } from '../../redux/actions';

export default function Card(props) {
	const { id, title, image, diets, healthScore } = props;
	const dispatch = useDispatch();

	const handleDetail = () => {
		dispatch(getRecipeByDetail(id));
	};

	return (
		<div className={styles.container}>
			<article className={styles.card}>
				<figure className={styles.cardFigure}>
					<img className={styles.cardImage} src={image} alt={title} />
				</figure>
				<div className={styles.cardContent}>
					<h2 className={styles.cardTitle}>{title}</h2>
					<p className={styles.cardText}>
						Health Score: {healthScore}
					</p>
					<ul className={styles.cardDiets}>
						{diets?.map((diet, index) => (
							<li key={index} className={styles.cardDiet}>
								{diet.name}
							</li>
						))}
					</ul>
				</div>
			</article>
			<div className={styles.buttonContainerCard}>
				<Link to={`/detail`} onClick={handleDetail}>
					<button className={styles.buttonCard}>
						<span className={styles.spanButtonCard}>Detail</span>
					</button>
				</Link>
			</div>
		</div>
	);
}
