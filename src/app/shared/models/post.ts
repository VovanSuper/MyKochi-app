export interface PostModel {
  amp_enabled: boolean;
  amp_validity: any;
  author: any;
  categories: Array<any>;
  comment_status: string;
  content: {
    rendered: string;
    class: string;
  };
  date: string;
  date_gmt: string;
  excerpt: {
    rendered: string,
    protected: boolean;
  };
  featured_media: number;
  format: string;
  guid: { rendered: string; };
  id: number;
  link: string;
  meta: any;
  modified: string;
  modified_gmt: string;
  ping_status: string;
  slug: string;
  status: boolean;
  sticky: boolean;
  tags: Array<number>;
  template: string;
  title: { rendered: string; };
  type: string;
  yoast_head: any;
  _links: {
    self: Array<any>,
    collection: Array<any>,
    about: Array<any>,
    author: Array<any>,
    replies: Array<any>;
  };
}