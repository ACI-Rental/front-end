import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() headers: Array<string> = [];
  @Input() data: Array<any> = [];

  constructor() { }
  
  
  ngOnInit(): void {
  }

  TurnStringToCamelCase(string: string) {
    const words = string.split(" ").map((word, index) => {
      let newWord = word;
  
      if (/[/]+/.test(word)) {
        newWord = word
          .split("/")
          .map((w) => (w = w[0].toUpperCase() + w.substr(1)))
          .join("Or");
      }
  
      if (/[-]+/.test(word)) {
        newWord = word
          .split("-")
          .map((w) => (w = w[0].toUpperCase() + w.substr(1)))
          .join("");
      }
  
      if (index === 0) {
        newWord = newWord = newWord[0].toLowerCase() + newWord.substr(1);
      } else {
        newWord = newWord = newWord[0].toUpperCase() + newWord.substr(1);
      }
  
      return newWord;
    });
  
    return words.join("");
  }

}