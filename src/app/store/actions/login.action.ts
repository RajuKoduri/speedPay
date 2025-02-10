
import { Action, createAction, props } from "@ngrx/store";

export const loadLogin = createAction("[Login Component] Load Login",props<any>())
export const loginSuccess = createAction("[Login Component] Login Success", props<any>()) 
export const loginFail = createAction("[Login Component] Login Fail", props<any>())
export const clearState = createAction("[Logout Component] Clear State")


// export const LOGIN_START = "[login] LOGIN_START";
// export const LOGIN_SUCCESS = "[login] LOGIN_SUCCESS";
// export const LOGIN_FAIL = "[login] LOGIN_FAIL";

// export const PLAYER_LOGGEDIN = "[login] PLAYER_LOGGEDIN";


// export class LoginStart implements Action{
//     readonly type = LOGIN_START;
//     constructor(public payload:Object){}

// }
// export class LoginSuccess{
//     readonly type = LOGIN_SUCCESS;
//     constructor(public payload:Object){}
// }

// export class LoginFail implements Action{
//     readonly type = LOGIN_FAIL;
//     constructor(public payload:Object){}
// }

// export class PlayerLoggedIn implements Action {
//     readonly type = PLAYER_LOGGEDIN;
//     constructor(public payload: { loggedIn: boolean }) { }
// }

// export type LoginActions = LoginStart | LoginSuccess |  LoginFail;