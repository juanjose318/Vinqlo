import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faRunning,
  faCalendarDay,
  faBook,
  faCocktail,
  faInfo,
  faIcons,
} from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from './category.services';
import { Category } from './models/category.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SideBarComponent implements OnInit {
  categories: Category;
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoryService.getCagories().subscribe((responseData) => {
      this.categories = responseData.categories;
    });
  }

  goToCategoryPage(categoryId) {
    this.router.navigate(['/category', categoryId]);
  }

  faRunning = faRunning;
  faCalendarDay = faCalendarDay;
  faBook = faBook;
  faCocktail = faCocktail;
  faInfo = faInfo;
  faIcons = faIcons;
}
