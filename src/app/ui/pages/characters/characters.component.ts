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
    CharacterCardComponent,
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
  public totalPages = signal<number>(0);
  public currentPage = signal<number>(1);

  private _characterSrv = inject(CharacterUsecase);

  ngOnInit(): void {
    this._characterSrv.getCharacters(1, 10).subscribe(response => {
      this.characters.set(response.characters);
      this.currentPage.set(response.pagination.currentPage);
      this.totalPages.set(response.pagination.totalPages);
    });
  }

  public getPagination(action: string): void {
    let page;
    if (action === 'next') {
      page = this.currentPage() + 1;
    } else {
      page = this.currentPage() - 1;
    }

    if (page > this.totalPages() || page <= 0) return
    this._loadCharacters(page);
  }

  private _loadCharacters(page: number): void {
    this._characterSrv.getCharacters(page, 10).subscribe(response => {
      this.characters.set(response.characters);
      this.currentPage.set(response.pagination.currentPage);
    });
  }
}
