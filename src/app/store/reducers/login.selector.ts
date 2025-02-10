import { createFeatureSelector, createSelector } from "@ngrx/store";
import { loginModel } from "./login.reducer";
// import { loginModel } from "./models";

const getloginState = createFeatureSelector<loginModel>('login');

export const  getlogin = createSelector(getloginState,(state)=>{
    console.log(state);
    return state
})