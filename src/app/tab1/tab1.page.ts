import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { merge, Observable, of } from 'rxjs';
import { concatMap, mergeMap } from 'rxjs/operators';

import { PostModel } from '../shared/models/post';
import { WordpressService } from '../shared/providers/wp.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  items: Array<PostModel & { img$: Observable<string>; }> = [];
  // attaches: any[];
  thumbs = new Map();
  thumbsArr: any[] = [];
  posts: PostModel[] = [];
  page = 0;
  loaded = false;
  loading = false;
  constructor(public navCtrl: NavController, public wpSvc: WordpressService) {
  }

  getKeys(map) {
    return Array.from(map.keys());
  }

  loadPosts() {
    this.loading = true;
    this.wpSvc.getPosts(this.page).pipe(
      mergeMap((posts: PostModel[]) => {
        let innerItems = posts.map(p => ({
          ...p,
          img$: this.getMediaForPostId(p.id)
        }));
        return of(innerItems);
        // return innerItems;
      })
    ).subscribe(data => {
      console.log(this.items);
      this.items = data;
      this.loading = false;
      this.loaded = true;
    });
  }

  private getMediaForPostId(id: number) {
    return this.wpSvc.getMediaForPost(id);
  }

  next() {
    this.page++;
    this.loadPosts();
  }

  gotoDetails(item: PostModel & { img$: Observable<string>; }) {
    this.navCtrl.navigateForward(`/tabs/home/${item.id}`, { animated: true });
  }

  ngOnInit() {
    this.loading = false;
    this.page = 1;
    this.loadPosts();
  }

}

