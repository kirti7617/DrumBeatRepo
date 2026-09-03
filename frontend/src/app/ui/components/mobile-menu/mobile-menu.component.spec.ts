import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {provideTranslateService} from '@ngx-translate/core';

import {MobileMenuComponent} from './mobile-menu.component';

describe('MobileMenuComponent', () => {
  let component: MobileMenuComponent;
  let fixture: ComponentFixture<MobileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileMenuComponent],
      providers: [provideTranslateService({lang: 'en', fallbackLang: 'en'})]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileMenuComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('genres', ['rock', 'techno']);
    fixture.componentRef.setInput('selectedGenre', 'rock');
    fixture.componentRef.setInput('beats', ['anthem']);
    fixture.componentRef.setInput('selectedBeat', 'anthem');
    fixture.componentRef.setInput('bpm', 120);
    fixture.detectChanges();
  });

  it('should not display the menu when closed', () => {
    expect(fixture.debugElement.query(By.css('.mobile-menu-backdrop'))).toBeNull();
  });

  it('should display the menu when open', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.mobile-menu-backdrop'))).not.toBeNull();
  });

  it('should emit close when the close button is clicked', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
    const close = jasmine.createSpy('close');
    component.close.subscribe(close);

    fixture.debugElement.query(By.css('.mobile-menu-close')).nativeElement.click();

    expect(close).toHaveBeenCalled();
  });

  it('should emit genre, beat, and bpm changes', () => {
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
    const genre = jasmine.createSpy('genre');
    const beat = jasmine.createSpy('beat');
    const bpm = jasmine.createSpy('bpm');
    component.genreChange.subscribe(genre);
    component.beatChange.subscribe(beat);
    component.bpmChange.subscribe(bpm);
    const selects = fixture.debugElement.queryAll(By.css('select'));
    selects[0].nativeElement.value = 'techno';
    selects[0].nativeElement.dispatchEvent(new Event('change'));
    selects[1].nativeElement.value = 'anthem';
    selects[1].nativeElement.dispatchEvent(new Event('change'));
    component.onBpmChange({target: {value: '128'}} as unknown as Event);

    expect(genre).toHaveBeenCalledWith('techno');
    expect(beat).toHaveBeenCalledWith('anthem');
    expect(bpm).toHaveBeenCalledWith(128);
  });
});
