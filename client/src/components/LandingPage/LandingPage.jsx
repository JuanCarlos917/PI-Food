import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css'

export default function LandingPage() {
    return (
        <div className={style.container}>
            <div className={style.title}>
                <h1>Food App</h1>
            </div>
            <div className={style.button}>
                <Link to='/home'>
                    <button className={style.button}>Home</button>
                </Link>
            </div>
        </div>
    );
}