import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { MenuService } from 'src/app/shared/providers/menu.service';
import { PopoverMenuComponent } from 'src/app/shared/common/popover-menu/popover-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input('title') title = 'Posts';
  logoUrl = '/assets/App-logo.png';

  constructor(private menuSvc: MenuService, private popCtrl: PopoverController) { }

  ngOnInit() { }

  navRoot() {
    window.location.href = '/';
  }

  async popToggle($event?: Event) {
    let popover = await this.popCtrl.getTop();
    if (popover && popover.isConnected) {
      await this.popCtrl.dismiss();
    } else {
      let newPopover = await this.popoverCreate($event);
      newPopover.present();
    }
  }

  private async  popoverCreate($ev: Event) {
    return await this.popCtrl.create({
      component: PopoverMenuComponent,
      event: $ev,
      backdropDismiss: true,
      translucent: true,
      cssClass: 'app-menu__popover'
    });
  }

}