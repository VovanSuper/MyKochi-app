export const baseUrl = 'https://www.mykochionline.com/wp-json';

export const environment = {
  production: true,

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
