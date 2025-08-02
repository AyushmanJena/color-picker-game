import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

interface ColorValue {
    red: number;
    green: number;
    blue: number;
}

@Component({
  selector: 'app-game2',
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './game2.component.html',
  styleUrl: './game2.component.css'
})
export class Game2Component {
  colorShadeVisible = false;
  quizMode = false;
  newColorButton = true;
  showAnswer = false;

  systemColor: ColorValue = {
    red: 0,
    green: 0,
    blue: 0,
  }

  userColor : ColorValue = {
    red: 128,
    green: 128,
    blue: 128,
  }

  constructor(private renderer: Renderer2) {}

  showNewColorShade() {
    this.generateNewColorShade();
    this.colorShadeVisible = true;
    this.newColorButton = false;
    this.showAnswer = false;
    this.userColor = {
      red: 128,
      green: 128,
      blue: 128,
    }
    setTimeout(() => { this.colorShadeVisible = false; this.newColorButton = true;}, 1500);

    this.quizMode = true;
  }


  rgbString(): String {
    // return `R:${this.userColor.red} G:${this.userColor.green}  B:${this.userColor.blue}`;
    return `rgb(${this.userColor.red}, ${this.userColor.green}, ${this.userColor.blue})`;
  }

  compareColorShades(){
    this.colorShadeVisible = true;
    this.quizMode = false;
    this.newColorButton = true;
    this.showAnswer = true;
  }

  generateNewColorShade(){
    this.systemColor.red = Math.floor(Math.random() * (255 - 0 + 1) + 0); // (max - min + 1) +min
    this.systemColor.green = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    this.systemColor.blue = Math.floor(Math.random() * (255 - 0 + 1) + 0);
  }

  systemRgbString(): string {
    const { red, green, blue } = this.systemColor;
    return `rgb(${red}, ${green}, ${blue})`;
  }

}



