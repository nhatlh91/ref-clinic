// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1',
  host: 'http://localhost:8080',

  secretKey: '7D4A34BC8FD315E79C8B6B24BF67B',

  firebaseConfig: {
    apiKey: "AIzaSyDNRDhQN0qWpmVSHjX1CP_K_5tObFNejbQ",
    authDomain: "biz-clinic.firebaseapp.com",
    projectId: "biz-clinic",
    storageBucket: "biz-clinic.appspot.com",
    messagingSenderId: "814361547244",
    appId: "1:814361547244:web:764d1a43c6d0a54e5f30c9",
    measurementId: "G-GLRD17JQ7B"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
