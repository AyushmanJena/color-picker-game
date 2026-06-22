import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

interface ColorValue {
    red: number;
    green: number;
    blue: number;
    previewTextColor: string;
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
  colorSimilarity = 0;

  systemColor: ColorValue = {
    red: 0,
    green: 0,
    blue: 0,
    previewTextColor : '#ffffff',
  }

  userColor : ColorValue = {
    red: 128,
    green: 128,
    blue: 128,
    previewTextColor : '#000000',
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
      previewTextColor : '#ffffff',
    }
    setTimeout(() => { this.colorShadeVisible = false; this.newColorButton = true;}, 1500);

    this.quizMode = true;
  }


  rgbString(): String {
    // return `R:${this.userColor.red} G:${this.userColor.green}  B:${this.userColor.blue}`;
    this.userColor.previewTextColor = this.getContrastingTextColor(this.userColor.red, this.userColor.green, this.userColor.blue);
    return `rgb(${this.userColor.red}, ${this.userColor.green}, ${this.userColor.blue})`;
  }

  compareColorShades(){
    this.calculateSimilarity();
    this.colorShadeVisible = true;
    this.quizMode = false;
    this.newColorButton = true;
    this.showAnswer = true;
  }

  generateNewColorShade(){
    this.systemColor.red = Math.floor(Math.random() * (255 - 0 + 1) + 0); // (max - min + 1) +min
    this.systemColor.green = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    this.systemColor.blue = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    this.systemColor.previewTextColor = this.getContrastingTextColor(this.systemColor.red, this.systemColor.green, this.systemColor.blue);
  }

  systemRgbString(): string {
    const { red, green, blue } = this.systemColor;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  getContrastingTextColor(r: number, g: number, b: number): string {
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    // Extra condition for green-heavy colors
    const greenDominant = g > 180 && g - r > 100 && g - b > 80;

    if (greenDominant || luminance > 170) {
      return '#000000'; // black text
    }

    return '#ffffff'; // white text
  }

  calculateSimilarity(){
    // this.colorSimilarity = 50;
    let r1 = this.systemColor.red;
    let g1 = this.systemColor.green;
    let b1 = this.systemColor.blue;

    let r2 = this.userColor.red;
    let g2 = this.userColor.green;
    let b2 = this.userColor.blue;

    let dist = Math.sqrt(Math.pow(r2-r1, 2) + Math.pow(g2-g1, 2) + Math.pow(b2-b1, 2));

    // max dist possible = 441.67 for all 255

    this.colorSimilarity = Math.round(100 * (1 - dist / 441.67));
  }

}



