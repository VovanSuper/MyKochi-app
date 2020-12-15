import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;

@Injectable({ providedIn: 'root' })
export class ToastrService {

  constructor() { }

  async show({ text }: { text: string; }) {
    await Toast.show({
      duration: 'short',
      position: 'top',
      text
    });
  }

}