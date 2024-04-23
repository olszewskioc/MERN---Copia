import { combineReducers, configureStore } from '@reduxjs/toolkit';
import product from './slices/product';

// Create  the main reducer by combining all slices into one root reducer
const reducer = combineReducers({
    product,
});

export default configureStore({ reducer });