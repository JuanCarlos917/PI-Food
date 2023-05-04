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
import axios from 'axios';


export const getRecipe = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`/`);
            console.log(response);
			dispatch({ type: GET_RECIPES, payload: response.data });
		} catch (error) {
			console.log(error);
		}
	};
};

export const getRecipeByName = (name) => {
    return async (dispatch) => {
		try {
			const response = await axios(`/?name=${name}`);
            console.log(response);
			return dispatch({
				type: GET_RECIPES_BY_NAME,
				payload: response.data,
			});
		} catch (error) {
			dispatch({
				type: SET_RECIPE_CLEAN,
			});
		}
	};
}

export const getRecipeByDetail = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/${id}`);
            console.log(response);
            dispatch({ type: GET_RECIPES_BY_DETAIL, payload: response.data });
        } catch (error) {
            console.log(error);
        }
    };
}

export const getDiets = () => {
	return async (dispatch) => {
		try {
			const response = await axios.get(`/`);
			const diets = response.data.flatMap((recipe) => recipe.diets);
			const uniqueDiets = {};
			const filteredDiets = diets.filter((diet) => {
				if (!uniqueDiets[diet.name]) {
					uniqueDiets[diet.name] = true;
					return true;
				}
				return false;
			});
			dispatch({ type: GET_DIETS, payload: filteredDiets });
			console.log(filteredDiets);
		} catch (error) {
			console.log(error);
		}
	};
};

export const addRecipe = (payload) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('/', payload);
            console.log(response);
            dispatch({ type: ADD_RECIPE, payload: response.data });
        } catch (error) {
            console.log(error);
        }
    };
}

export const filterTypeDiet = (payload) => {
    return {
        type: FILTER_TYPE_DIET,
        payload,
    };
}

export const filterOrigin = (payload) => {
    return {
        type: FILTER_ORGIN,
        payload,
    };
}

export const orderCards = (payload) => {
	return {
		type: ORDERBY,
		payload: payload,
	};
};

export const resetFilter = () => {
    return {
        type: RESET_FILTER,
    };
}



