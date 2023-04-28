import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import { useDispatch } from 'react-redux';
import { getRecipeByDetail } from '../../redux/actions';

export default function Card({ id, title, image, diets, healthScore }) {
	const dispatch = useDispatch();

	const handleDetail = (e) => {
		e.preventDefault();
		dispatch(getRecipeByDetail(id));
	};
	return (
		<div className={styles.card}>
			<Link to={'/detail'} onClick={() => handleDetail(id)}>
				<div className={styles.card__header}>
					<img src={image} alt={title} />
				</div>
				<div className={styles.card__body}>
					<h3 className={styles.card__title}>{title}</h3>
					<div className={styles.card__diets}>
						<p className={styles.card__P}>
							{diets?.map((diet) => (
								<span
									key={diet.name}
									className={styles.card__diet}>
									{diet.name}
								</span>
							))}
						</p>
					</div>
					<div className={styles.card__healthScore}>
						<span>Health Score: {healthScore}</span>
					</div>
				</div>
			</Link>
		</div>
	);
}
