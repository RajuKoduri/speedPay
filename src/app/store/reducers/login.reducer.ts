import { createReducer, on } from "@ngrx/store"
// import { LOGIN_SUCCESS, } from "../actions/login.action"
// import { initialState, loginModel } from "./models"
// import * as loginAction from "../actions/login.action"
// import { playerloggdIn } from "./playerlogin";
import { common } from "./common";
import { clearState, loginFail, loginSuccess } from "../actions/login.action";

export interface loginModel extends common{
    loginDetails: any;
    status: boolean;
    errorMessage: string;
    // playerloggdIn: playerloggdIn;
    
}

export const initialState: loginModel = {
    loginDetails: null,
    status: false,
    errorMessage: '',
    // playerloggdIn:{
    //     loggedIn:false
    // },
    
}



export const loginReducer = createReducer(
    initialState,
    on(loginSuccess,(state, action)=>{
        if(action.loginDet == null){
            return {
                ...state,
                loginDetails:{...action.loginDet},
                errorMessage:'Invalid credentials'
            }
        }
        else{
            return {
                ...state,
                loginDetails:{...action.loginDet},
                status:true
            }
        }
    }),

    on(loginFail, (state, action)=>{
        return {
            ...state,
            loginDetails:[],
            errorMessage:action.Errortext
        }
    }),

    on(clearState, (state => initialState))
)

// export function loginReducer(state: any | undefined = initialState, action: any) {
//     switch (action.type) {

//         case loginAction.LOGIN_SUCCESS:
    
//             return {
//                 ...state,
//                 loginDetails: { ...state.loginDetails, ...action.payload },
//                 errorMessage: '',
//                 status: true
//             }
//             break;

//             // case loginAction.PLAYER_LOGGEDIN:
//             //     return {
//             //         ...state,
//             //         playerLoggedIn: { ...state.playerLoggedIn, ...action.payload }
//             //     }
//             //     break;

//         case loginAction.LOGIN_FAIL:
//             return {
//                 ...state,
//                 loginDetails: null,
//                 errorMessage: action.payload,
//                 status: false
//             }
//             break;
//         default:
//             return state;
//             break;
//     }
// }