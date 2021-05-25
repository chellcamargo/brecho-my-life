import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserAddPage } from './user-add.page';

describe('UserAddPage', () => {
  let component: UserAddPage;
  let fixture: ComponentFixture<UserAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
