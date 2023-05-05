import React, { useState, useEffect, useRef } from 'react';
import * as actions from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './NewRecipe.module.css';
import { Link, useNavigate } from 'react-router-dom';
import validate from './validateRecipe';

export default function NewRecipe() {
	const formRef = useRef(null);
	const dispatch = useDispatch();
	const allDiets = useSelector((state) => state.typeDiets);
	const navigate = useNavigate();
	const [stepDescription, setStepDescription] = useState('');
	const [errors, setErrors] = useState({});
	const [recipe, setRecipe] = useState({
		title: '',
		summary: '',
		healthScore: 50,
		image: '',
		steps: [],
		diets: [],
		numSteps: 0,
	});


	useEffect(() => {
		dispatch(actions.getDiets());
	}, [dispatch]);


	const handleChange = (e) => {
		setRecipe({
			...recipe,
			[e.target.name]: e.target.value,
		});

		setErrors(
			validate({
				...recipe,
				[e.target.name]: e.target.value,
			}),
		);
	};

	const changeHandler = (e) => {
		const value = e.target.value;
		if (e.target.checked) {
			setRecipe({ ...recipe, diets: [...recipe.diets, value] });
		} else {
			setRecipe({
				...recipe,
				diets: recipe.diets.filter((x) => x !== value),
			});
		}
	};


	const handleSubmit = (e) => {
		e.preventDefault();

		setErrors(validate(recipe));

		dispatch(actions.addRecipe(recipe)).then(() => {
			navigate(`/detail`);
		});

		setRecipe({
			title: '',
			summary: '',
			healthScore: 50,
			image: '',
			steps: [],
			diets: [],
			numSteps: 0,
		});
		formRef.current.reset();
	};

	const handleDelete = (e) => {

		e.preventDefault();
		setRecipe({
			...recipe,
			steps: [],
			numSteps: 0,
		});
	};

	function handleChangeStep(e) {
		setStepDescription(e.target.value);
	}

	function handleStep(e) {
		e.preventDefault();
		if (stepDescription !== '') {
			setRecipe({
				...recipe,
				numSteps: recipe.numSteps + 1,
				steps: [
					...recipe.steps,
					{ number: recipe.numSteps + 1, step: stepDescription },
				],
			});
			setStepDescription('');
		} else {
			alert('please put a step');
		}
	}

	return (
		<div className={styles.formSection}>
			<div className={styles.overlay} />

			<div className={styles.title}>
				<h2>New Recipe</h2>
			</div>

			<div className={styles.formContainer}>
				<form
					onSubmit={handleSubmit}
					className={styles.formulario}
					ref={formRef}>
					<Link to='/home'>
						<button className={styles.buttonPostBack}>
							<span className={styles.spanPostBack}>
								Back to home
							</span>
						</button>
					</Link>
					<div className={styles.imgContainer}>
						<img src={recipe.image} alt='' />
					</div>
					<div className={styles.inputName}>
						<label className={styles.inputTitle}>Title</label>
						<input
							className={
								errors.title ? styles.errorInput : styles.input
							}
							type='text'
							value={recipe.title}
							name='title'
							onChange={handleChange}
						/>
						{errors.title && (
							<span className={styles.errorInput}>
								{errors.title}
							</span>
						)}
					</div>
					<div className={styles.inputResumen}>
						<label className={styles.inputTitle}>Summary</label>
						<textarea
							className={
								errors.summary
									? styles.errorInput
									: styles.textarea
							}
							type='text'
							value={recipe.summary}
							name='summary'
							maxLength='1000'
							onChange={handleChange}
						/>
						{errors.summary && (
							<span className={styles.errorInput}>
								{errors.summary}
							</span>
						)}
					</div>
					<div className={styles.inputName}>
						<label className={styles.inputTitle}>
							Health Score
						</label>
						<input
							type='range'
							min='0'
							max='100'
							value={recipe.healthScore}
							name='healthScore'
							onChange={handleChange}
							id='range-input'
						/>
						<output id='rangevalue'>{recipe.healthScore}</output>
					</div>
					<div className={styles.inputName}>
						<label className={styles.inputTitle}>Image</label>
						<input
							className={
								errors.image ? styles.errorInput : styles.input
							}
							type='url'
							value={recipe.image}
							name='image'
							onChange={handleChange}
						/>
						{errors.image && (
							<span className={styles.errorInput}>
								{errors.image}
							</span>
						)}
					</div>
					<div className={styles.inputResumen}>
						<label className={styles.inputTitle}>
							Step by step
						</label>
						<textarea
							className={styles.textareaSteps}
							type='text'
							name='steps'
							maxLength='500'
							value={stepDescription}
							onChange={handleChangeStep}
						/>
						<div className={styles.btnContainer}>
							<button
								onClick={handleStep}
								className={styles.btnx}>
								Add
							</button>
							<button
								className={styles.btnx}
								onClick={handleDelete}>
								Clean
							</button>
						</div>
						<ul>
							{recipe.steps.map((e, index) => {
								return (
									<p key={index} className={styles.listSteps}>
										{e.number} : {e.step}
									</p>
								);
							})}
						</ul>
					</div>
					<div className={styles.inputDietas}>
						<label className={styles.inputTitle}>Type Diets</label>
						{allDiets.map((diet) => (
							<div key={diet.id}>
								<label htmlFor=''>
									<input
										className={styles.inputCheck}
										type='checkbox'
										onChange={changeHandler}
										name='diets'
										value={diet.name}
									/>
									{diet.name}
								</label>
							</div>
						))}
					</div>

					<button
						type='submit'
						className={
							recipe.diets.length &&
							recipe.steps.length &&
							!Object.keys(errors).length
								? styles.buttonForm
								: styles.buttonFormEnabled
						}
						disabled={
							recipe.diets.length &&
							recipe.steps.length &&
							!Object.keys(errors).length
								? false
								: true
						}>
						Create Recipe
					</button>
				</form>
			</div>
		</div>
	);
}
