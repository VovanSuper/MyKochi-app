import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ModalController } from "@ionic/angular";

import { ModalService } from '../../providers/modal.service';
import { AboutModalComponent } from '../cmps/about-modal/about-modal.component';
import { DataPrivacyModalComponent } from '../cmps/data-privacy-modal/data-privacy-modal.component';


@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
})
export class PopoverMenuComponent implements OnInit {
  menuTitle = 'Menu';

  appPages = {
    About: {
      title: 'About',
      component: AboutModalComponent,
      icon: 'menu'
    },

    DataPrivacy: {
      title: 'Data Privacy',
      component: DataPrivacyModalComponent,
      icon: 'person-circle'
    }
  };

  get Pages() {
    return Object.values(this.appPages).map(({ title, icon = null, component = null }: { title: string, icon: string | null, component: Type<any> | any; }) => { return { title, icon, component }; });
  }

  get PagesCount() {
    return this.Pages.length - 1;
  }

  constructor(private router: Router, private popover: PopoverController, private modalSvc: ModalService) { }

  ngOnInit() { }

  goto(page = this.appPages.About) {
    // this.router.navigateByUrl(path);
    const { title } = page;
    this.modalSvc.createModal({ component: page.component, componentProps: { title } });
    this.popover.dismiss();
  }


}
