import { combineReducers, configureStore } from '@reduxjs/toolkit';
import product from './slices/product';
import cart from  './slices/cart';

// Create  the main reducer by combining all slices into one root reducer
const reducer = combineReducers({
    product,
    cart,
});

export default configureStore({ reducer });