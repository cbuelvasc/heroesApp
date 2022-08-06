import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, Observable } from 'rxjs';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  heroe: Heroe = {
    id: '',
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
  };

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroeById(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok!', {
      duration: 2500,
    });
  }

  openDialog(heroe: Heroe): Observable<any> {
    const dialog = this.dialog.open(DialogComponent, {
      width: '250px',
      data: heroe,
    });
    return dialog.afterClosed();
  }

  save(): void {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroesService
        .updateHeroe(this.heroe.id, this.heroe)
        .subscribe((heroe) => this.openSnackBar('Heroe updated...!'));
    } else {
      this.heroesService.addHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/edit', heroe.id]);
        this.openSnackBar('Heroe created...!');
      });
    }
  }

  delete(): void {
    this.openDialog({ ...this.heroe }).subscribe((result) => {
      if (result) {
        this.heroesService.deleteHeroe(this.heroe.id).subscribe((response) => {
          this.router.navigate(['/heroes']);
        });
      }
    });
  }
}
