import { Component } from '@angular/core';
import { faSadCry } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-not-found-component',
  templateUrl: './not-found-component.component.html',
  styleUrls: ['./not-found-component.component.scss']
})
export class NotFoundComponent {
  faSadCry = faSadCry;

  constructor() { }



}
