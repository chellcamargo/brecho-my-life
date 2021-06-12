import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VendaAddPage } from './venda-add.page';

describe('VendaAddPage', () => {
  let component: VendaAddPage;
  let fixture: ComponentFixture<VendaAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendaAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VendaAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
