import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'iHoover';
  options: any;
  x: number = 10;
  y: number = 10;
  x1: number = 0;
  y1: number = 0;
  position: string = '';
  listInstructions: Array<string> = [];
  instruction: string;

  data = [
    {
      x: 0,
      y: 0
    }
  ];

  constructor() {

  }

  ngOnInit(): void {
    this.data[0].x = this.x1;
    this.data[0].y = this.y1;
    this.options = {
      data: this.data,
      series: [{
        type: 'line',
        xKey: 'x',
        yKey: 'y',
        yName: this.position,
      }],
      axes: [
        {
          type: 'number',
          position: 'bottom',
          min: 0,
          max: this.x,
        },
        {
          type: 'number',
          position: 'left',
          min: 0,
          max: this.y,
        },
      ],
    };
  }

  avancer() {
    switch (this.position) {
      case '': alert("Choisir l'orientation");
        break;
      case 'N': if ((this.y1 >= this.y))
        alert("il est impossible d'avancee")
      else
        this.y1 = this.y1 + 1;
        break;
      case 'W': if (this.x1 == 0)
        alert("il est impossible d'avancee")
      else if (this.x1 != 0)
        this.x1 = this.x1 - 1;
        break;
      case 'S': if ((this.y1 == 0))
        alert("il est impossible d'avancee")
      else if (this.y1 != 0)
        this.y1 = this.y1 - 1;
        break;
      case 'E': if (this.x1 >= this.x)
        alert("il est impossible d'avancee")
      else
        this.x1 = this.x1 + 1;
        break;

    }
    this.ngOnInit();
  }

  tournerGauche() {
    switch (this.position) {
      case '': alert("Choisir l'orientation");
        break;
      case 'N': this.position = 'W';
        break;
      case 'W': this.position = 'S';
        break;
      case 'S': this.position = 'E';
        break;
      case 'E': this.position = 'N';
        break;
    }
    this.ngOnInit();
  }

  tournerDroit() {
    switch (this.position) {
      case '': alert("Choisir l'orientation");
        break;
      case 'N': this.position = 'E';
        break;
      case 'E': this.position = 'S';
        break;
      case 'S': this.position = 'W';
        break;
      case 'W': this.position = 'N';
        break;
    }
    this.ngOnInit();
  }

  valuechange(newValue) {
    if (this.x1 > this.x)
      alert('valeur de x est incorrect');
    else if (this.y1 > this.y)
      alert('valeur de y est incorrect');
    this.ngOnInit();
  }

  ajouter() {
    if ((this.position == '') || (this.x1 == null) || (this.y1 == null)
    ||  (this.instruction == null))
    alert('vérifier les parameters')
    else
      this.listInstructions.push(this.instruction);
  }

  lancer() {
    if (!this.listInstructions.length)
      alert('choisir les instructions a faire');
    else
  {
      from(this.listInstructions).pipe(
        concatMap(item => of(item).pipe(delay(1000)))
      ).subscribe(timedItem => {
        switch (timedItem) {
          case 'A': this.avancer();
            break;
          case 'D': this.tournerDroit();
            break;
          case 'G': this.tournerGauche();
            break;

        }
      })
    }
    this.listInstructions = [];
  }

}


