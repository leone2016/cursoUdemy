// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultImage: "http://relojes593.com/bancoImagenes/default.png",
  localStorageKey: 'waki-commerce2018',
  urlAssets: "",
  waki_cart: {
    localStorageKey:'waki-cart'
  },
  waki_rest_service_configuration:{
    api_url: 'http://localhost:8080/waki-rest/restfull/',
    articleModule:{
      path: 'shop/articleViewer'
    },
    newUser:{
      path: 'user/sendEmail'
    },
    authUser:{
      path: 'auth/login',
      localStorageKey: 'waki-user'
    },
    authApp:{
      path: 'auth/login/',
      user: 'lmedinae@est.ups.edu.ec',
      password: '1724084247',
      localStorageKey: 'waki-commerce'
    }
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
