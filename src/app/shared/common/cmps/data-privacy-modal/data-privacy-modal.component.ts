import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from 'src/app/shared/providers/modal.service';

@Component({
  selector: 'app-data-privacy-modal',
  templateUrl: './data-privacy-modal.component.html',
  styleUrls: ['./data-privacy-modal.component.scss'],
})
export class DataPrivacyModalComponent implements OnInit {
  @Input() title = 'Modal Page';
  @Input() text = `
    A ​flashcard​ or ​flash card​ is a card bearing ​information​ on both sides, which is intended to be used as an aid in
    memorization​. Each flashcard bears a question on one side and an answer on the other. Flashcards are often
    used to memorize ​vocabulary​, historical dates, formulas or any subject matter that can be learned via a
    question-and-answer format. Flashcards can be virtual (part of a ​flashcard software​), or physical.
    Flashcards are an application of the ​testing effect​ − the finding that ​long-term memory​ is increased when some
    of the learning period is devoted to retrieving the information through testing with proper feedback. Study habits
    affect the rate at which a flashcard-user learns, and proper ​spacing of flashcards​ has been proven to accelerate
    learning
  `;

  constructor(private modalSvc: ModalService) { }

  ngOnInit() { }

  close() {
    this.modalSvc.dismissModal();
  }

}
