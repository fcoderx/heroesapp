import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe.interfaces';
import { HeroeService } from '../../services/heroe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

    heroe: Heroe = {
        nombre: '',
        bio: '',
        casa: 'Marvel'
    };
    nuevo = false;
    id: string;

    constructor(private _heroeService: HeroeService,
                private router: Router,
                private route: ActivatedRoute) {

        this.route.params.subscribe(params => {
            this.id = params['id'];

            if ( this.id !== 'nuevo') {
                this._heroeService.getHeroe(this.id).subscribe( data => {
                    this.heroe = data;
                });
            }
        });
    }

    ngOnInit() {
    }

    guardar() {
        console.log(this.heroe);
        if (this.id === 'nuevo') {

            this._heroeService.nuevoHeroe(this.heroe).subscribe(data => {
                this.router.navigate(['/heroe', data.name]);
            },
            error => console.log(error));

        } else {

            this._heroeService.actualizarHeroe(this.heroe, this.id).subscribe(data => {
                console.log(data);
            },
            error => console.log(error));
        }
    }

    agregarNuevo(forma: NgForm) {
        this.router.navigate(['/heroe', 'nuevo']);

        forma.reset({
            casa: 'Marvel'
        });
    }

}
