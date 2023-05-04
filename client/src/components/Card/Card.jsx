import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';
import { useDispatch } from 'react-redux';
import { getRecipeByDetail } from '../../redux/actions';

export default function Card(props) {
    const { id, title, image, diets, healthScore } =
		props;
	const dispatch = useDispatch();

	const handleDetail = () => {
		dispatch(getRecipeByDetail(id));
	};

	return (
		<Link to={`/detail`} onClick={handleDetail}>
			<div className={styles.recipes}>
				<div>
					<img src={image} alt='' />
				</div>
				<div className={styles.info}>
					<h2>{title}</h2>
					<p>Health Score: {healthScore}</p>
					<div className={styles.diets}>
						<p id={styles.diets}>
							{diets?.map((diet) => (
								<span className={styles.span}>{diet.name}</span>
							))}
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
}
