import { TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing';

describe('LandingComponent', () => {
  it('renders the CacaoMarket landing heading', async () => {
    await TestBed.configureTestingModule({
      imports: [LandingComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(LandingComponent);
    fixture.detectChanges();

    const heading = fixture.nativeElement.querySelector('[data-testid="landing-title"]') as HTMLElement;
    expect(heading.textContent).toContain('Where cocoa harvests meet');
  });
});
