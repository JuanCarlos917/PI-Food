import {
	ADD_RECIPE,
	FILTER_TYPE_DIET,
	FILTER_ORGIN,
	RESET_FILTER,
	ORDERBY,
	GET_RECIPES,
	GET_RECIPES_BY_DETAIL,
	SET_RECIPE_CLEAN,
	GET_RECIPES_BY_NAME,
	GET_DIETS,
} from './actions-types';

const initialState = {
	recipes: [],
	allRecipes: [],
	typeDiets: [],
	newRecipes: [],
};
const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_RECIPES:
			return {
				...state,
				recipes: action.payload,
				allRecipes: action.payload,
			};
		case GET_RECIPES_BY_NAME:
			return {
				...state,
				recipes: action.payload,
			};
		case GET_RECIPES_BY_DETAIL:
			return {
				...state,
				newRecipes: action.payload,
			};
		case GET_DIETS:
			return {
				...state,
				typeDiets: action.payload,
			};
		case FILTER_TYPE_DIET:
			const allRecipes = state.allRecipes;
			const dietFilter =
				action.payload === 'All'
					? allRecipes
					: allRecipes.filter((recipe) =>
							recipe.diets
								.map((e) => e.name)
								.includes(action.payload),
					  );
			return {
				...state,
				recipes: dietFilter,
			};
		case FILTER_ORGIN:
			let filterR = [];

			switch (action.payload) {
				case 'All':
					filterR = state.allRecipes;
					break;
				case 'Db':
					filterR = state.allRecipes.filter((e) => e.createDb);
					break;
				case 'Api':
					filterR = state.allRecipes.filter((e) => !e.createDb);
					break;
				default:
					filterR = state.allRecipes;
			}

			return {
				...state,
				recipes: filterR,
			};

		case ORDERBY:
			const { payload } = action;
			let orderRecipes, orderAllRecipes;
			switch (payload) {
				case 'a-z':
					orderRecipes = [...state.recipes].sort((a, b) =>
						a.title.localeCompare(b.title),
					);
					orderAllRecipes = [...state.allRecipes].sort((a, b) =>
						a.title.localeCompare(b.title),
					);
					break;
				case 'z-a':
					orderRecipes = [...state.recipes].sort((a, b) =>
						b.title.localeCompare(a.title),
					);
					orderAllRecipes = [...state.allRecipes].sort((a, b) =>
						b.title.localeCompare(a.title),
					);
					break;
				case '1-9':
					orderRecipes = [...state.recipes].sort(
						(a, b) => a.healthScore - b.healthScore,
					);
					orderAllRecipes = [...state.allRecipes].sort(
						(a, b) => a.healthScore - b.healthScore,
					);
					break;
				case '9-1':
					orderRecipes = [...state.recipes].sort(
						(a, b) => b.healthScore - a.healthScore,
					);
					orderAllRecipes = [...state.allRecipes].sort(
						(a, b) => b.healthScore - a.healthScore,
					);
					break;
				default:
					orderRecipes = state.allRecipes;
					orderAllRecipes = state.allRecipes;
					break;
			}
			return {
				...state,
				recipes: orderRecipes,
				allRecipes: orderAllRecipes,
			};

		case ADD_RECIPE:
			return {
				...state,
				recipes: [...state.recipes, action.payload],
				allRecipes: [...state.allRecipes, action.payload],
				newRecipes: action.payload,
			};
		case SET_RECIPE_CLEAN:
			return {
				...state,
				recipes: [],
			};
		case RESET_FILTER:
			return {
				...state,
				allRecipes: action.payload,
			};
		default:
			return state;
	}
};

export default rootReducer;
