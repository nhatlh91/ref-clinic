import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import CryptoJS from 'crypto-js';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'name';
const ROLE_KEY = 'role';
const CRE_KEY = 'cre';
const SECRET_KEY = environment.secretKey;
const ACCESS_JSON_KEY = 'access_json';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  public getToken() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken !== null) {
      return accessToken;
    } else {
      return sessionStorage.getItem(ACCESS_TOKEN_KEY);
    }
  }

  getRole(): any {
    const roleData = localStorage.getItem(ROLE_KEY);
    if (roleData != null) {
      return JSON.parse(roleData);
    } else {
      const sessionRoleData = sessionStorage.getItem(ROLE_KEY);
      return sessionRoleData ? JSON.parse(sessionRoleData) : {};
    }
  }

  public saveAccessJson(json: any) {
    window.localStorage.removeItem(ACCESS_JSON_KEY);
    window.localStorage.setItem(ACCESS_JSON_KEY, json);
  }

  public saveAccessTokenLocal(token: string) {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  public saveRefreshTokenLocal(token: string) {
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  public saveUserLocal(user: any) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveRoleLocal(role: any) {
    window.localStorage.removeItem(ROLE_KEY);
    window.localStorage.setItem(ROLE_KEY, JSON.stringify(role));
  }

  public saveCreLocal(cre: any) {
    window.localStorage.removeItem(CRE_KEY);
    window.localStorage.setItem(CRE_KEY, JSON.stringify(cre));
  }

  public getCreateDate() {
    const creData = localStorage.getItem(CRE_KEY);
    if (creData === null) {
      return 'Unauthorized';
    }

    try {
      const dateSplit = creData.split('"')[1]
      const bytes = CryptoJS.AES.decrypt(dateSplit, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8)
    } catch (error) {
      console.error('Error decrypting create date:', error);
      return 'Unauthorized';
    }
  }

  getDecryptedName(): string {
    const userData = localStorage.getItem(USER_KEY);
    if (userData === null) {
      return 'Unauthorized';
    }

    try {
      const userSplit = userData.split('"')[1]
      const decryptedBytes = CryptoJS.AES.decrypt(userSplit, SECRET_KEY);
      return decryptedBytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Error decrypting user data:', error);
      return 'Unauthorized';
    }
  }

  getDecryptedRole(): string {
    const roleData = localStorage.getItem(ROLE_KEY);
    if (roleData === null) {
      return 'Unauthorized';
    }

    try {
      const roleSplit = roleData.split('"')[1]
      const decryptedBytes = CryptoJS.AES.decrypt(roleSplit, SECRET_KEY);
      return decryptedBytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Error decrypting role data:', error);
      return 'Unauthorized';
    }
  }

  getAccessJson(): AuthInfo | undefined {
    const access_json = localStorage.getItem(ACCESS_JSON_KEY);
    if (access_json == null) {
      return undefined;
    }

    try {
      const decryptedBytes = CryptoJS.AES.decrypt(access_json, SECRET_KEY);
      return JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));  // Chuyển chuỗi thành Json
    } catch (error) {
      console.error('Error decrypting user data:', error);
      return undefined;
    }
  }

}

export class AuthInfo {
  userId: number;
  username: string;
  accessToken: string;
  refreshToken: string;
  role: string;
}
