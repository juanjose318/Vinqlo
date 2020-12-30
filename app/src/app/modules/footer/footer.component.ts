import { Component } from '@angular/core';
import { faPhoneSquareAlt } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent  {
 faInstagram = faInstagram;
 faPhoneSquareAlt = faPhoneSquareAlt;

}
