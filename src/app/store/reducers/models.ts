import { common } from "./common";
import { playerloggdIn } from "./playerlogin";

// export const loginRes:common = {
//     loginName: "",
//     permissions: [],
//     sessionId: "",
//     success: false
// }

export interface loginModel extends common{
    loginDetails: any;
    status: boolean;
    errorMessage: string;
    playerloggdIn: playerloggdIn;
}

// export const initialState: loginModel = {
//     loginDetails: null,
//     status: false,
//     errorMessage: '',
//     playerloggdIn:{
//         loggedIn:false
//     },
// }

