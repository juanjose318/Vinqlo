import { Component  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-searchbar',
  styleUrls: ['./search-bar.component.scss'],
  template:
  `
  <div class="m-searchbar-wrapper">
    <fa-icon class="a-post-search-icon" [icon]="faSearch"></fa-icon>
    <form class="a-form">
      <input class="a-input" type="search" placeholder="Search by tag..">
    </form>
  </div>
  `
})

export class SearchBarComponent {

  faSearch = faSearch;
  ngOnInit() { }
}
