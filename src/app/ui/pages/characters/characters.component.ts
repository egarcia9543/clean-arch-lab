import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CharacterUsecase } from '../../../domain/usecases/character-usecase';
import { CharacterGateway } from '../../../domain/gateways/character-gateway';
import { CharacterService } from '../../../infrastructure/drivenadapters/character.service';
import { Character } from '../../../core/models/mapped-characters';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [
    CharacterCardComponent
  ],
  providers: [
    CharacterUsecase,
    {
      provide: CharacterGateway,
      useClass: CharacterService
    }
  ],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersComponent implements OnInit {
  public characters = signal<Character[]>([]);
  private _characterSrv = inject(CharacterUsecase);

  ngOnInit(): void {
    this._characterSrv.getCharacters().subscribe(response =>
      this.characters.set(response.characters)
    );
  }
}
