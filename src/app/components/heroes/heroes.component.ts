import { Component, OnInit } from '@angular/core';
import { HeroeService } from '../../services/heroe.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

    heroes: any = [];
    loading = true;
    deleteFull = true;

    constructor(
        private _heroeService: HeroeService
    ) {
        this._heroeService.getHeroes().subscribe( data => {
            console.log(data);
            this.heroes = data;
            this.loading = false;
        });
    }

    ngOnInit() {
    }

    borrarHeroe(key$: string) {
        this.deleteFull = false;
        this._heroeService.borrarHeroe(key$).subscribe(data => {
            if (data) {
                console.error(data);
            } else {
                delete this.heroes[key$];
            }
        });
    }

}
