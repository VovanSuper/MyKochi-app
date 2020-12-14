import { Injectable, Type } from '@angular/core';
import { ModalController, } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalPage: HTMLIonModalElement = null;

  constructor(private modalCtrl: ModalController) { }

  public createModal = async ({ component, componentProps }: { component: Type<any>, componentProps: { [key: string]: any; }; }): Promise<void> => {
    this.modalPage = await this.modalCtrl.create({
      component,
      componentProps,
      id: component.name,
      animated: true,
      backdropDismiss: true,
      showBackdrop: true
    });
    return this.modalPage.present();
  };

  public dismissModal = async (modal: HTMLIonModalElement = null): Promise<boolean> => {
    if (this.modalPage) {
      return this.modalPage.dismiss();
    }
    const topModal = await this.modalCtrl.getTop();
    if (topModal) {
      return topModal.dismiss();
    }
    else {
      if (modal) {
        if (modal == this.modalPage) {
          return this.modalPage.dismiss();
        }
        if (this.modalPage) {
          this.modalPage = null;
        }
        return modal.dismiss();
      } else if (this.modalPage) {
        return this.modalPage.dismiss();
      }
      else {
        return Promise.reject(false);
      }
    }
  };
}
