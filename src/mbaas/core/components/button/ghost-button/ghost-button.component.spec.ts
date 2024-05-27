import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GhostButtonComponent } from './ghost-button.component';
import { DirectiveModule } from '../../form/directives/directive.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { DirectivesModule } from 'src/mbaas/core/directives/directives.module';
import { ButtonContinueModule } from '../../button-continue/button-continue.module';
import { jwtTokenGetter } from 'src/mbaas/mbaas.module';
import { JwtModule } from '@auth0/angular-jwt';
import { StoreModule } from '@ngrx/store';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';



describe('GhostButtonComponent', () => {
  let component: GhostButtonComponent;
  let fixture: ComponentFixture<GhostButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GhostButtonComponent],
      imports: [DirectiveModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        DirectivesModule,
        ButtonContinueModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        JwtModule.forRoot({
          config: {
            tokenGetter: jwtTokenGetter,
            allowedDomains: ['.*']
          }
        })],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GhostButtonComponent);
    component = fixture.componentInstance;
    component.buttonType = 'toggle';
    component.showMoreText = 'Ver más';
    component.showLessText = 'Ver menos';
    component.toggleOn;
     fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnChanges();
    expect(component).toBeTruthy();
  });

  it('should  onButtonAction', () => {
    component.onButtonAction();
    expect(component).toBeTruthy();
  });

  it('should  onButtonAction path', () => {
    component.buttonType = 'infinite';
    component.onButtonAction();
    expect(component).toBeTruthy();
  });
});
