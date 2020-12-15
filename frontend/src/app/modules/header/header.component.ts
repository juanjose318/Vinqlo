import { Component } from '@angular/core';
import { faUserAlt, faList, faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: 'header.component.html'
})

export class HeaderComponent  {
  faUserAlt = faUserAlt;
  faList = faList;
  faEnvelope = faEnvelope;
}
