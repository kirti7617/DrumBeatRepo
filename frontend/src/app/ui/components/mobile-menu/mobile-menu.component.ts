import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';

import {SelectInputComponent} from '../select-input/select-input.component';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [SelectInputComponent, TranslatePipe],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileMenuComponent {
  @Input() isOpen = false;
  @Input() genres: readonly string[] = [];
  @Input() selectedGenre = '';
  @Input() beats: readonly string[] = [];
  @Input() selectedBeat = '';
  @Input() bpm = 120;

  @Output() genreChange = new EventEmitter<string>();
  @Output() beatChange = new EventEmitter<string>();
  @Output() bpmChange = new EventEmitter<number>();
  @Output() close = new EventEmitter<void>();

  closeMenu(): void {
    this.close.emit();
  }

  onBpmChange(event: Event): void {
    const bpm = Number((event.target as HTMLInputElement).value);
    if (Number.isFinite(bpm)) {
      this.bpmChange.emit(bpm);
    }
  }
}
