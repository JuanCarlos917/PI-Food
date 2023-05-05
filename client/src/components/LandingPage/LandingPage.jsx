import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';
import imageLP from '../../assets/bglp.jpg';

export default function LandingPage() {
	return (
		<main className={style.container}>
			<header className={style.titleText}>
				<h1>Food App</h1>
			</header>
			<section className={style.buttonContainer}>
				<Link to='/home'>
					<button className={style.buttonHome}>
						<span className={style.spanButtonHome}>Go To Home</span>
					</button>
				</Link>
			</section>
			<img src={imageLP} alt='img home' className={style.imageLP} />
		</main>
	);
}
