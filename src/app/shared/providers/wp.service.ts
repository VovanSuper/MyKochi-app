import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { baseUrl, environment } from "../../../environments/environment";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PostModel } from '../models/post';

const { wpEndpoint } = environment;

@Injectable({ providedIn: 'root' })
export class WordpressService {
  items: any[];
  categories: any[];
  public wp_org: boolean = true;
  mainUrl = baseUrl;

  constructor(private http: HttpClient) { }

  public getPosts(page: number) {
    return this.http.get(`${wpEndpoint.posts}?status=publish&page=${page}`) as Observable<Array<any>>;
  }

  public getPostsByCat(categoryName: string, page: number) {
    return this.http.get(`${wpEndpoint.posts}?status=publish&categories=${categoryName}&page=${page}`);
  }

  public getMediaForPost(postId: number) {
    return this.http.get(`${wpEndpoint.media}?parent=${postId}`).pipe(
      map((data: Array<{ guid: { rendered: string; }; }>) => (data[0]?.guid?.rendered ?? '/assets/App-logo.png'))
    );
  }

  public getCategories(): Observable<Array<any>> {
    return this.http.get(`${wpEndpoint.categories}?order_by=count&order=desc`) as Observable<Array<any>>;
  }

  public search(searchStr: string, page: number) {
    return this.http.get(`${wpEndpoint.posts}?status=publish&search=${searchStr}&page=${page}`) as Observable<Array<any>>;
  }

  public getPostById(postId: number) {
    return this.http.get(`${wpEndpoint.posts}/${postId}`) as Observable<PostModel>;
  }
}