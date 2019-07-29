import { Component, OnInit } from '@angular/core';

import { fadeInAnimation } from '../animations/fade-in.animation';

@Component({
  selector: 'app-landing-page1',
  templateUrl: './landing-page1.component.html',
  animations: [fadeInAnimation],
  styleUrls: ['./landing-page1.component.css']
})
export class LandingPage1Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
