import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Game2Component} from './game2/game2.component';

@Component({
  selector: 'app-root',
  imports: [Game2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'color-guesser-frontend';
}
