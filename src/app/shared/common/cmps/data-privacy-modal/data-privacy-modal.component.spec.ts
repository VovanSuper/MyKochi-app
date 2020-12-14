import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataPrivacyModalComponent } from './data-privacy-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DataPrivacyModalComponent', () => {
  let component: DataPrivacyModalComponent;
  let fixture: ComponentFixture<DataPrivacyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPrivacyModalComponent ],
      imports: [IonicModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DataPrivacyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
