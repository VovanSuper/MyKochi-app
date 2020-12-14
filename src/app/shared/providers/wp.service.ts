import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import '@capacitor-community/http';
import { Http, HttpHeaders, HttpResponse } from '@capacitor-community/http';

import { baseUrl, environment } from "../../../environments/environment";
import { map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { PostModel } from '../models/post';

const { wpEndpoint } = environment;
const headers: HttpHeaders = { 'Accept': '*/*' };

@Injectable({ providedIn: 'root' })
export class WordpressService {
  items: any[];
  categories: any[];
  public wp_org: boolean = true;
  mainUrl = baseUrl;

  // constructor(private http: HttpClient) { }

  public getPosts(page: number) {
    // return this.http.get(`${wpEndpoint.posts}?status=publish&page=${page}`) as Observable<Array<any>>;
    return from(Http.request({
      method: 'GET',
      url: `${wpEndpoint.posts}?status=publish&page=${page}`,
      headers
    }))
      .pipe(map((resp: HttpResponse) => resp.data));
  }

  public getPostsByCat(categoryName: string, page: number) {
    // return this.http.get(`${wpEndpoint.posts}?status=publish&categories=${categoryName}&page=${page}`);
    return from(Http.request({
      method: 'GET',
      url: `${wpEndpoint.posts}?status=publish&categories=${categoryName}&page=${page}`,
      headers
    }))
      .pipe(map((resp: HttpResponse) => resp.data));
  }

  public getMediaForPost(postId: number) {
    // return this.http.get(`${wpEndpoint.media}?parent=${postId}`).pipe(
    //   map((data: Array<{ guid: { rendered: string; }; }>) => (data[0]?.guid?.rendered ?? '/assets/App-logo.png'))
    // );
    return from(Http.request({
      method: 'GET',
      url: `${wpEndpoint.media}?parent=${postId}`,
      headers
    }))
      .pipe(
        map((resp: HttpResponse) => resp.data),
        map((data: Array<{ guid: { rendered: string; }; }>) => (data[0]?.guid?.rendered ?? '/assets/App-logo.png'))
      );
  }

  public getCategories(): Observable<Array<any>> {
    // return this.http.get(`${wpEndpoint.categories}?order_by=count&order=desc`) as Observable<Array<any>>;
    return from(Http.request({
      method: 'GET',
      url: `${wpEndpoint.categories}?order_by=count&order=desc`,
      headers
    }))
      .pipe(map((resp: HttpResponse) => resp.data));

  }

  public search(searchStr: string, page: number) {
    // return this.http.get(`${wpEndpoint.posts}?status=publish&search=${searchStr}&page=${page}`) as Observable<Array<any>>;
    return from(Http.request({
      method: 'GET',
      url: `${wpEndpoint.posts}?status=publish&search=${searchStr}&page=${page}`,
      headers
    }))
      .pipe(map((resp: HttpResponse) => resp.data));
  }

  public getPostById(postId: number) {
    // return this.http.get(`${wpEndpoint.posts}/${postId}`) as Observable<PostModel>;
    return from(Http.request({
      method: 'GET',
      url: `${wpEndpoint.posts}/${postId}`,
      headers
    }))
      .pipe(map((resp: HttpResponse) => resp.data));
  }
}