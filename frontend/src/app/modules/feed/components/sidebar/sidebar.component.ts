import { Component  } from '@angular/core';
import { faRunning, faCalendarDay, faBook, faCocktail, faInfo, faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SideBarComponent {
  faRunning = faRunning;
  faCalendarDay = faCalendarDay;
  faBook = faBook;
  faCocktail = faCocktail;
  faInfo = faInfo;
  faHandHoldingHeart = faHandHoldingHeart;
}
