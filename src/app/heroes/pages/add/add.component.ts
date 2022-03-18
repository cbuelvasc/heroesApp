import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AddComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      description: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      description: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: '',
  };

  constructor(
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroeService.getHeroeById(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  saveHeroe(): void {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      this.heroeService
        .updateHeroe(this.heroe)
        .subscribe((heroe) => this.openSnackBar('Heroe updated'));
    } else {
      this.heroeService.addHeroe(this.heroe).subscribe((heroe) => {
        this.router.navigate(['/heroes/edit', heroe.id]);
        this.openSnackBar('Heroe created');
      });
    }
  }

  deleteHeroe(): void {
    this.dialog
      .open(DialogComponent, {
        width: '250px',
        data: { ...this.heroe },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.heroeService.deleteHeroe(this.heroe.id!).subscribe((resp) => {
            this.router.navigate(['/heroes']);
          });
        }
      });
    /**/
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2500,
    });
  }
}
