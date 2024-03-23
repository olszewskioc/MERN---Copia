import { setProducts, setLoading, setError, setPagination, setFavorites, setFavoritesToggle } from "../slices/product";
import  axios from 'axios';

export const getProducts = (page, favouriteToogle) => async(dispatch) =>{
    dispatch(setLoading())
    try{
        const { data } = await axios.get(`http://localhost:5000/api/products/${page}/${10}`);
        const { products, pagination } = data;
        dispatch(setProducts(products));
        dispatch(setPagination(pagination));
        
    } catch (error) {
        dispatch(setError(
            error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message 
            ? error.message 
            : 'Unexpected Error occured! Please try again later!'
            ))
    }
};

export const addToFavorites = (id) => async (dispatch, getState) => {
    const { 
        product: { favorites }, 
    } = getState();
    const newFavorites = [...favorites, id];
    localStorage.setItem('favorites', JSON.stringify(newFavorites));

    dispatch(setFavorites(newFavorites));
};

export const removeFromFavorites = (id) => async (dispatch, getState) => {
    const { 
        product: { favorites }, 
    } = getState();
    const newFavorites = favorites.filter((favoriteId) => favoriteId !== id);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));

    dispatch(setFavorites(newFavorites));
};

export const toggleFavorites = (toggle) => async (dispatch, getState) => {
    const { 
        product: { favorites, products }, 
    } = getState();

    if (toggle) {
		const filteredProducts = products.filter((product) => favorites.includes(product._id));
		dispatch(setFavoritesToggle(toggle));
		dispatch(setProducts(filteredProducts));
	} else {
		dispatch(setFavoritesToggle(false));
		dispatch(getProducts(1));
	}
};