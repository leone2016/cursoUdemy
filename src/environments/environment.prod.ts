// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  defaultImage: "http://relojes593.com/assets/images/default.png",
  localStorageKey: 'waki-commerce2018',
  urlAssets: "",
  waki_cart: {
    localStorageKey:'waki-cart'
  },
  waki_rest_service_configuration:{
    api_url: 'http://216.154.219.73:8080/waki-rest-1.0/restfull/',
    articleModule:{
      path: 'shop/articleViewer'
    },
    newUser:{
      path: 'user/sendEmail'
    },
    authUser:{
      path: 'auth/login',
      method: 'POST',
      localStorageKey: 'waki-user'
    },
    authApp:{
      path: 'auth/login/',
      user: 'lmedinae@est.ups.edu.ec',
      password: '1724084247',
      localStorageKey: 'waki-commerce'
    },
    ngPayFlow:{
      path:'shop/payflowPOST',
      method:'POST'

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
