import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject, BehaviorSubject } from "rxjs";
import { userModel } from "./user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

export interface AuthResponseInterface {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: "root"
})
export class authService {
  timeOutForLOgOut;
  authenticatedUser = new BehaviorSubject<userModel>(null);
  constructor(private http: HttpClient, private router: Router) {}
  signUpwithEmail(email, password) {
    const payload = {
      email,
      password,
      returnSecureToken: true
    };
    return this.http
      .post<AuthResponseInterface>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
          environment.firebase_API_key,
        payload,
        {
          headers: new HttpHeaders({ "content-type": "application/json" })
        }
      )
      .pipe(
        tap(res => {
          this.initialiseUser(res);
        }),
        catchError(this.handleError)
      );
  }

  signIn(email, password) {
    const payload = {
      email,
      password,
      returnSecureToken: true
    };
    return this.http
      .post<AuthResponseInterface>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          environment.firebase_API_key,
        payload,
        {
          headers: new HttpHeaders({ "content-type": "application/json" })
        }
      )
      .pipe(
        tap(res => {
          this.initialiseUser(res);
        }),
        catchError(this.handleError)
      );
  }
  logOut() {
    localStorage.removeItem("user");
    this.authenticatedUser.next(null);
    this.router.navigate(["/auth"]);
    clearTimeout(this.timeOutForLOgOut);
  }

  autoLogOut(expiresInMilliSeconds) {
    console.log(expiresInMilliSeconds);

    this.timeOutForLOgOut = setTimeout(() => {
      this.logOut();
    }, expiresInMilliSeconds);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = "An unknown error occured";
    if (!error.error || !error.error.error) {
      return throwError(errorMsg);
    }
    switch (error.error.error.message) {
      case "EMAIL_EXISTS": {
        errorMsg =
          " This email already exists..Logging with your password to get into your account";
        break;
      }
      case "EMAIL_NOT_FOUND": {
        errorMsg = " The credentials are incorrect";

        break;
      }
      case "INVALID_PASSWORD": {
        errorMsg = " The credentials are incorrect";

        break;
      }
    }
    return throwError(errorMsg);
  }

  initialiseUser(res) {
    console.log("hey");
    console.log(new Date());
    console.log(new Date().getTime());
    console.log("bye");

    const expirataionTime = new Date(
      new Date().getTime() + res.expiresIn * 1000
    );
    console.log(expirataionTime);
    // we store in model the time at which token expires - Mon Apr 13 2020 23:52:55 GMT+0530
    const user = new userModel(
      res.email,
      res.localId,
      res.idToken,
      expirataionTime
    );
    console.log(user);

    this.authenticatedUser.next(user);
    this.autoLogOut(+res.expiresIn * 1000);
    localStorage.setItem("user", JSON.stringify(user));
  }
  autoLogin() {
    const userFromStorage = JSON.parse(localStorage.getItem("user"));

    if (!userFromStorage) {
      return;
    }
    console.log(userFromStorage.expirationTime);

    const user = new userModel(
      userFromStorage.email,
      userFromStorage.uId,
      userFromStorage._idToken,
      new Date(userFromStorage.expirationTime)
    );
    console.log(user);

    if (user.token) {
      this.authenticatedUser.next(user);

      let validUptoInMs = new Date(userFromStorage.expirationTime).getTime();

      let currentimeInMs = new Date().getTime();

      let rem = validUptoInMs - currentimeInMs;

      this.autoLogOut(rem);
    }
  }
}
