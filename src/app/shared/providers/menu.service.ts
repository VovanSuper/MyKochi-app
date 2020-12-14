import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BehaviorSubject, from } from 'rxjs';
import { concatMap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  isOpen = false;

  constructor(private menuCtrl: MenuController) { }

  async toggleMenu(id?: string) {
    this.isOpen = await this.menuCtrl.isOpen(id);
    this.isOpen ? this.menuCtrl.close(id) : this.menuCtrl.open(id);
  }
}
