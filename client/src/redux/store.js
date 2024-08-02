import { combineReducers, configureStore } from '@reduxjs/toolkit';
import product from './slices/product';
import cart from  './slices/cart';
import user from './slices/user';

// Create  the main reducer by combining all slices into one root reducer
const reducer = combineReducers({
    product,
    cart,
    user,
});

export default configureStore({ reducer });