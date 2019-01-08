import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Heroe } from '../interfaces/heroe.interfaces';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {

    heroesUrl = 'https://heroesapp-ec6bc.firebaseio.com/heroes.json';
    heroeUrl = 'https://heroesapp-ec6bc.firebaseio.com/heroes/';

    constructor(private http: Http) { }

    nuevoHeroe(heroe: Heroe) {
        const body = JSON.stringify(heroe);

        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http.post(this.heroesUrl, body, {headers}).map(res => {
            console.log(res.json());
            return res.json();
        });

    }

    actualizarHeroe(heroe: Heroe, key$: string) {
        const body = JSON.stringify(heroe);

        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        const url = `${this.heroeUrl}/${key$}.json`;

        return this.http.put(url, body, {headers}).map(res => {
            console.log(res.json());
            return res.json();
        });

    }

    getHeroe(key$: string) {
        const url = `${this.heroeUrl}/${key$}.json`;

        return this.http.get(url).map(res => res.json());
    }

    getHeroes() {
        return this.http.get(this.heroesUrl).map(res => res.json());
    }

    borrarHeroe( key$: string) {
        const url = `${this.heroeUrl}/${key$}.json`;

        return this.http.delete(url).map(resp => resp.json());
    }
}
