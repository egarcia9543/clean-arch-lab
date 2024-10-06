import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PlanetUsecae } from '../../../domain/usecases/planet-usecase';
import { PlanetGateway } from '../../../domain/gateways/planet-gateway';
import { PlanetService } from '../../../infrastructure/drivenadapters/planet.service';
import { Planets } from '../../../core/models/mapped-planets';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [
    MatTableModule
  ],
  providers: [
    PlanetUsecae,
    {
      provide: PlanetGateway,
      useClass: PlanetService
    }
  ],
  templateUrl: './planets.component.html',
  styleUrl: './planets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetsComponent implements OnInit {
  public planetsTableData = signal<Planets[]>([]);
  public currentPage = signal<number>(1);
  public totalPages = signal<number>(0);
  public displayedColumns = ['id', 'name', 'destroyed']

  private _planetSrv = inject(PlanetUsecae);

  ngOnInit(): void {
    this._planetSrv.getPlanets().subscribe(response => {
      this.planetsTableData.set(response.planets);
    });
  }
}
