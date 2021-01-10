import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CommunityService {
  constructor(private http: HttpClient) {}

  getCommunities(categoryId, communitiesPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${communitiesPerPage}&page=${currentPage}`;
    return this.http
      .get<{ category: any; message: string; maxCommunities: number }>(
        `${environment.apiUrl}/category/` + categoryId.id + queryParams
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

  deleteCommunity(categoryId, communityId) {
    return this.http.delete<{ message: string }>(
      `${environment.apiUrl}/category/` + categoryId + '/' + communityId
    );
  }

  joinCommunity(communityId) {
    return this.http.post<{message: string}>(`${environment.apiUrl}/category/` + communityId + '/join', true)
    .subscribe();
  }
}
