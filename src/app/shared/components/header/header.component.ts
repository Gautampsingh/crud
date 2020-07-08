import { Component, OnInit } from '@angular/core';
import Label from '../../constants/Label';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  labels: any;

  constructor() {}

  ngOnInit(): void {
    this.labels = Label;
  }

  toggleMenu() {
    let x = document.querySelector('nav');
    if (x.style.display === 'flex') {
      x.style.display = 'none';
    } else {
      x.style.display = 'flex';
    }
  }
}
