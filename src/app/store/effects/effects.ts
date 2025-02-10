import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of} from "rxjs";
import { LoginService } from "src/app/source/login.service";
// import { LOGIN_START, LoginStart, LoginSuccess, } from "../actions/login.action";
// import * as loginAction from "../actions/login.action"
// import { common } from "../reducers/common";
// import { loginModel } from "../reducers/login.reducer";
import { loadLogin, loginFail, loginSuccess } from "../actions/login.action";


@Injectable()
export class LoginEffects {
    
    constructor(public lS: LoginService, public actions$: Actions) { }

    Login = createEffect(() =>
        this.actions$.pipe(
            ofType(loadLogin),
            exhaustMap((action) => {
                return this.lS.login(action.userData).pipe(
                    map((data) => {    
                        return loginSuccess({ loginDet: data })
                    }),
                    catchError((error) => of(loginFail({Errortext: error.message})))
                )
            })
        )
    )


    // @Effect()
    // loginStart = this.actions$.pipe(
    //     ofType(loginAction.LOGIN_START),
    //     exhaustMap((onLoginStart: loginAction.LoginStart) =>
    //         this.lS.login(onLoginStart.payload)
    //             .pipe(
    //                 map((data: common) => {
    //                     return new loginAction.LoginSuccess(data);
    //                 }),
    //                 catchError((error) => of(new loginAction.LoginFail(error.message)))
    //             )
    //     )
    // )

    // @Effect({ dispatch: false })
    // loginSuccess = this.actions$.pipe(
    //     ofType(loginAction.LOGIN_SUCCESS),
    //     tap((onLoginSuccess: loginAction.LoginSuccess) => {
    //         if (onLoginSuccess.payload) {              

    //             this.lS.onPlayerLoggedIn(true);
    //             return;
    //         }
    //         this.lS.onPlayerLoggedIn(false);
    //     })
    // )
}