import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../shared/providers/wp.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],

})
export class Tab2Page implements OnInit {
  items: any[];
  attachs: any[];
  cats = new Map();
  catsArr: any[];
  loading: boolean;

  constructor(public wpSvc: WordpressService) {
  }

  getKeys(map) {
    return Array.from(map.keys());
  }

  ngOnInit() {
    this.loading = true;
    this.wpSvc.getCategories().subscribe(data => {
      this.items = data;
      for (let res of data) {
        if (!this.cats.has(res.id) && res.parent == 0 && res.name != "Uncategorized" && res.count > 0) {
          const image = '/assets/App-logo.png';
          this.cats.set(res.id, { id: res.id, slug: res.id, post_count: res.count, imageUrl: image, name: res.name });
        }
      }
      this.loading = false;
    });

  }
}

