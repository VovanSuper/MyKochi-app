import { Injectable } from '@angular/core';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  NotificationChannel,
  NotificationChannelList
} from '@capacitor/core';
import { ToastrService } from './toastr.services';

const { PushNotifications, App } = Plugins;

const l = console.log;

@Injectable({ providedIn: 'root' })
export class PushService {

  constructor(private toastr: ToastrService) { }


  initialize() {
    // App.getState().then(appState => appState.isActive)
    PushNotifications.requestPermission().then(result => {
      if (result.granted) {
        PushNotifications.register();
      } else {
        l('Failed to register to FCM');
      }
    });

    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      l('FCM reg token');
      const postsChannel: NotificationChannel = {
        id: '/postschannel/',
        name: 'newpostschannel',
        importance: 1
      };
      PushNotifications.createChannel(postsChannel).then(_ => l('postschannel created'));
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      l('Error on registration: ' + JSON.stringify(error));
    });


    PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotification) => {
      l('FCM on Push received :::::: ', notification);
      await this.toastr.show({ text: notification.title });
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: PushNotificationActionPerformed) => {
      l('ON FCM  pushNotificationActionPerformed  :::::: ', notification);
    });
  }
}