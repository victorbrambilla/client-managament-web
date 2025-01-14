import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  fetchAuthSession,
  signIn,
  signOut,
  confirmResetPassword,
  confirmSignUp,
  resetPassword,
  signUp,
  updateUserAttribute,
  SignUpOutput,
} from '@aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticated.asObservable();
  private currentSession: any = null;

  constructor() {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: environment.cognito.userPoolId,
          userPoolClientId: environment.cognito.clientId,
        },
      },
    });

    this.checkAuth();
  }

  async checkAuth(): Promise<boolean> {
    try {
      const session = await fetchAuthSession();
      console.log(session);
      this.currentSession = session;
      this.isAuthenticated.next(true);
      return session.tokens?.accessToken ? true : false;
    } catch (error) {
      this.isAuthenticated.next(false);
      return false;
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const user = await signIn({
        username: email,

        password: password,
      });

      const session = await fetchAuthSession();
      this.currentSession = session;
      this.isAuthenticated.next(true);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async signup(
    email: string,
    password: string,
    username: string,
    name: string
  ): Promise<SignUpOutput> {
    try {
      const res = await signUp({
        username: username,
        password: password,
        options: {
          userAttributes: {
            email: email,
            name: name,
          },
        },
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async confirmSignUp(email: string, code: string) {
    try {
      const res = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      return res;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut();
      this.currentSession = null;
      this.isAuthenticated.next(false);
    } catch (error) {
      throw error;
    }
  }

  async resetPasswordMethod(email: string): Promise<any> {
    try {
      const res = await resetPassword({
        username: email,
      });

      return res;
    } catch (error) {
      throw error;
    }
  }

  async getAuthenticationStatus(): Promise<boolean> {
    if (this.isAuthenticated.value) {
      return true;
    } else {
      return this.checkAuth();
    }
  }

  getJwtToken(): string | null {
    if (this.currentSession) {
      if (this.currentSession && this.currentSession.tokens) {
        return this.currentSession.tokens.accessToken.toString()
      }
    }
    return null;
  }
}
