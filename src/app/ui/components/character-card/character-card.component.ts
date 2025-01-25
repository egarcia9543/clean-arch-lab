import { Component, input, Input, signal } from '@angular/core';
import { Character } from '../../../core/models/mapped-characters';

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
  character = input.required<Character>();
  number = signal<number>(0);

  constructor () {
    setTimeout(() => {
      this.number.update(_ => 1);
    }, 2000)
  }
}
