import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	loading: false,
	error: null,
	userInfo: JSON.parse(localStorage.getItem('userInfo')) ?? null,
    serverMsg: null,
    serverStatus: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setLoading: (state) => {
			state.loading = true;
		},
		userLogin: (state, {payload}) => {
            state.userInfo = payload;
            state.error = null;
            state.loading = false;
        },
		userLogout: (state) => {
            state.error = null;
            state.loading = false;
            state.userInfo = null;
        },
		setError: (state, {payload}) => {
            state.error = payload;
            state.loading = false;
        },
		verificationEmail: (state) => {
            state.userInfo.active = true;
            state.error = null;
            state.loading = false;
        },
        setServerResponseMsg: (state, {payload}) => {
            state.serverMsg = payload;
        },
        setServerResponseStatus: (state, {payload}) => {
            state.serverStatus = payload;
            state.loading = false;
        },
        stateReset: (state) => {
            state.error = null;
            state.loading = false;
            state.serverMsg = null;
        },
        setUserOrders: (state, {payload}) => {
            state.error = null;
            state.loading = false;
            state.orders = payload;
        }
	},
});

export const { setLoading, setError, userLogin, userLogout, setServerResponseMsg, setServerResponseStatus, setUserOrders, stateReset, verificationEmail } =
	userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state) => state.user;