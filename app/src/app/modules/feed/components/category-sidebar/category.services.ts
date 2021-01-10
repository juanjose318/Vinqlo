import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCagories() {
    return this.http
      .get<{ message: string; categories: any }>(
        `${environment.apiUrl}/categories`
      )
      .pipe(
        map((responseData) => {
          return {
            categories: responseData.categories.map((categories) => {
              return {
                name: categories.name,
                isMandatory: categories.isMandatory,
                id: categories._id,
                icon: categories.icon
              };
            }),
          };
        })
      );
  }
}
