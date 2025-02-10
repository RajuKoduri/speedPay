import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ErrorService } from '../error-service/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  errorMessageArr: any = []
  constructor(private errorService: ErrorService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(req);

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if(!event.url?.endsWith('login')){
          if (!event?.body || Object.keys(event.body)?.length === 0 || event.body?.objectList?.length == 0) {
          // if (!event?.body || Object.keys(event.body)?.length === 0 || event.body?.resultCount == 0 || event.body?.objectList?.length == 0) {
            this.errorService.showError([{ 'statusText': 'No data received from the server.' }]);
          }
        }
      }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status !== 401) {
          // this.errorService.showError(error.message);
          // this.errorService.showError(error.statusText);
        }
        this.handleError(error)
        return throwError(error);
      })
    );
  }

  private handleError(error: any): void {
console.log(error)
console.log(error.url)
    let errorMessage = 'Something went wrong, please contact admin';
    let api = (error?.url?.split('/'))
    console.log(api)
    if (api[api?.length - 1] != "sessionTouch" && api[api.length - 1] != "logout" && api[api.length - 1] != "login" ) {

      if (error.error instanceof Error) {
        errorMessage = error.error.message;
        this.errorMessageArr.push({ 'Error': error.error.message, api: api[api.length - 1], status:error.status, statusText:error.statusText });
      } else {
        try {
          if (error.error.message) {
            errorMessage = error.error.message;
            this.errorMessageArr.push({ 'Error': error.error.message, api: api[api.length - 1], status:error.status, statusText:error.statusText });
          } else if (error.message) {
            errorMessage = error.message;
            this.errorMessageArr.push({ 'Error': error.message, api: api[api.length - 1],status:error.status, statusText:error.statusText });
          }
        } catch (err) {
          // Fallback to default error message
        }
        console.log(this.errorMessageArr)
      }
    }
    this.errorService.showError(this.errorMessageArr);
  }
}
