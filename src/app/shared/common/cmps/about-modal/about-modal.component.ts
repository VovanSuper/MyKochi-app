import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/shared/providers/modal.service';

@Component({
  selector: 'app-about-modal',
  templateUrl: './about-modal.component.html',
  styleUrls: ['./about-modal.component.scss'],
})
export class AboutModalComponent implements OnInit {
  @Input() title = 'About Us';
  @Input() text = `
    MyKochiOnline.com is Kochi’s own portal dedicated for providing news,
    information, entertainment with updates of events,
    happenings, offers and lot more.
  `;

  constructor(private modalSvc: ModalService) { }

  ngOnInit() { }

  close() {
    this.modalSvc.dismissModal();
  }

}
