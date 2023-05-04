import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';

export default function LandingPage() {
	return (
		<main className={style.container}>
			<header className={style.titleText}>
				<h1>Food App</h1>
			</header>
			<section className={style.buttonContainer}>
				<Link to='/home'>
					<button className={style.buttonHome}>Home</button>
				</Link>
			</section>
		</main>
	);
}
