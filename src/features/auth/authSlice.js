
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const initialState = {
    user: { email: '', role: "" },
    isloading: true,
    isError: false,
    error: ""
}

export const createUser = createAsyncThunk(
    "auth/createUser",
    async ({ email, password }) => {
        const data = await createUserWithEmailAndPassword(auth, email, password);
        return data.user.email;
    })
export const getUser = createAsyncThunk(
    "auth/getUser",
    async (email) => {
        const res = await fetch(`http://localhost:5000/user/${email}`);
        const data = await res.json();
        if (data.status) {
            return data;
        }
        return email;
    })
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }) => {
        const data = await signInWithEmailAndPassword(auth, email, password);
        return data.user.email;
    })
export const googleSignUp = createAsyncThunk(
    "auth/googleSignUp",
    async () => {
        const googleProvider = new GoogleAuthProvider();
        const data = await signInWithPopup(auth, googleProvider);
        return data.user.email;
    })

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = { email: '', role: "" }
            state.isloading = false;
            state.isError = false;
            state.error = ""
        },
        setUser: (state, { payload }) => {
            state.user.email = payload;
            state.isloading = false;

        },
        toggleLoading: (state) => {
            state.isloading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.user.email = "";
                state.isloading = true;
                state.isError = false;
                state.error = ""

            })
            .addCase(createUser.fulfilled, (state, { payload }) => {
                state.user.email = payload;
                state.isloading = false;
                state.isError = false;
                state.error = ""

            })
            .addCase(createUser.rejected, (state, action) => {
                state.user.email = "";
                state.isloading = false;
                state.isError = true;
                state.error = action.error.message

            })
            .addCase(loginUser.pending, (state) => {
                state.user.email = "";
                state.isloading = true;
                state.isError = false;
                state.error = ""

            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.user.email = payload;
                state.isloading = false;
                state.isError = false;
                state.error = ""

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.user.email = "";
                state.isloading = false;
                state.isError = true;
                state.error = action.error.message

            })
            .addCase(googleSignUp.pending, (state) => {
                state.user.email = "";
                state.isloading = true;
                state.isError = false;
                state.error = ""

            })
            .addCase(googleSignUp.fulfilled, (state, { payload }) => {
                state.user.email = payload;
                state.isloading = false;
                state.isError = false;
                state.error = ""

            })
            .addCase(googleSignUp.rejected, (state, action) => {
                state.user.email = "";
                state.isloading = false;
                state.isError = true;
                state.error = action.error.message

            })
            .addCase(getUser.pending, (state) => {
                state.isloading = true;
                state.isError = false;
                state.error = ""

            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                if (payload.status) {
                    state.user = payload.data;
                }
                else {
                    state.user.email = payload
                }
                state.isloading = false;
                state.isError = false;
                state.error = ""

            })
            .addCase(getUser.rejected, (state, action) => {
                state.user.email = "";
                state.isloading = false;
                state.isError = true;
                state.error = action.error.message

            })
    }
})

export const { logOut, setUser, toggleLoading } = authSlice.actions;

export default authSlice.reducer;