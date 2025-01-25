import { ChangeDetectionStrategy, Component, inject, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { PlanetUsecae } from '../../../domain/usecases/planet-usecase';
import { PlanetGateway } from '../../../domain/gateways/planet-gateway';
import { PlanetService } from '../../../infrastructure/drivenadapters/planet.service';
import { Planets } from '../../../core/models/mapped-planets';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-planets',
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatPaginator
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public planetsTableData = signal<MatTableDataSource<Planets>>(new MatTableDataSource<Planets>([]));
  public currentPage = signal<number>(1);
  public totalPages = signal<number>(0);
  public length = signal<number>(0);
  public displayedColumns: string[] = ['selection', 'id', 'name', 'destroyed']
  public selectionAmount = 0;

  public rowsSelected = new SelectionModel<number>(true, []);

  private _planetSrv = inject(PlanetUsecae);

  ngOnInit(): void {
    this._planetSrv.getPlanets().subscribe(response => {
      this.planetsTableData.set(new MatTableDataSource<Planets>(response.planets));
      this.currentPage.set(response.pagination.currentPage);
      this.totalPages.set(response.pagination.totalPages);
      this.length.set(response.pagination.totalItems);
    });
  }

  ngAfterViewInit() {
    this.handlePaginationChanges();
  }

  isAllSelected(): boolean {
    const numSelected = this.rowsSelected.selected.length;
    const displayedRows = this.planetsTableData().connect().value.length;

    if (numSelected === 0) {
      return false;
    }

    return numSelected === displayedRows && this.isAllDisplayedRowsSelected();
  }

  isAllDisplayedRowsSelected(): boolean {
    let isAllDisplayedSelected = true;

    if (this.rowsSelected.selected.length === 0) {
      return this.isAllSelected();
    }

    this.planetsTableData().connect().value.some(element => {
      if (!this.rowsSelected.isSelected(element.planetId)) {
        isAllDisplayedSelected = false;
        return true; // Return true to stop the iteration
      }
      return false; // Return false to continue the iteration
    });
    return isAllDisplayedSelected;
  }

  masterToggle(event: MatCheckboxChange) {
    this.isViewableSelected() ?
      this.deselectRows() :
      this.selectRows();
  }

  isViewableSelected() {
    return (this.isAllSelected() || this.isAllDisplayedRowsSelected());
  }

  deselectRows() {
    const itemsToBeUnselected = this.planetsTableData().connect().value;
    itemsToBeUnselected.forEach(element => {
      this.rowsSelected.deselect(element.planetId);
    });
  }

  selectRows() {
    const currentlyDisplayedRows = this.planetsTableData().connect().value;

    for (let index = 0; index < currentlyDisplayedRows.length; index++) {
      this.rowsSelected.select(currentlyDisplayedRows[index].planetId);
      this.selectionAmount = this.rowsSelected.selected.length;
    }
  }


  handlePaginationChanges() {
    this.paginator.page.subscribe(page => {
      this.getPlanets(page.pageIndex + 1, page.pageSize);
    });
  }

  getPlanets(page: number, size: number) {
    this._planetSrv.getPlanets(page, size).subscribe(response => {
      this.planetsTableData.set(new MatTableDataSource<Planets>(response.planets));
      this.currentPage.set(response.pagination.currentPage);
      this.totalPages.set(response.pagination.totalPages);
      this.length.set(response.pagination.totalItems);
    });
  }

  sendSelectedPlanets() {
    const selectedPlanets = this.rowsSelected.selected;
    console.log(selectedPlanets);
  }
}
