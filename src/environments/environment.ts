// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const baseUrl = 'https://www.mykochionline.com/wp-json';

export const environment = {
  production: false,

  wpEndpoint: {
    posts: `${baseUrl}/wp/v2/posts`,
    categories: `${baseUrl}/wp/v2/categories`,
    tags: `${baseUrl}/wp/v2/tags`,
    pages: `${baseUrl}/wp/v2/pages`,
    comments: `${baseUrl}/wp/v2/comments`,
    taxonomies: `${baseUrl}/wp/v2/taxonomies`,
    users: `${baseUrl}/wp/v2/users`,
    search: `${baseUrl}/wp/v2/search`,
    media: `${baseUrl}/wp/v2/media`,
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
