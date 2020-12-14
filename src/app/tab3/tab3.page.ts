import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordpressService } from '../shared/providers/wp.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],

})
export class Tab3Page {
  title = 'About Us';
  text = `
    MyKochiOnline.com is Kochi’s own portal dedicated for providing news,
    information, entertainment with updates of events,
    happenings, offers and lot more.
  `;
}
