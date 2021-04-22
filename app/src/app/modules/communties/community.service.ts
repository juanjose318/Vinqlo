import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Community } from './models/community.interface';

@Injectable({ providedIn: 'root' })
export class CommunityService {
  constructor(private http: HttpClient) {}

  getCommunity(community) {
    return this.http
      .get<{ community: Community; message: string }>(
        `${environment.apiUrl}/category/community/` + community.id,
        community.id
      )
      .pipe(
        map((data) => {
          return data;
        })
      );
  }

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

  getUserCommunities() {
    return this.http
      .get<{ message: string; userCommunities: any }>(
        `${environment.apiUrl}/category/community/user/getUserCommunities`
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
    return this.http
      .post<{ message: string }>(
        `${environment.apiUrl}/category/` + communityId + '/join',
        true
      )
      .subscribe();
  }

  leaveCommunity(communityId) {
    return this.http
      .post<{ message: string }>(
        `${environment.apiUrl}/category/` + communityId + '/leave',
        true
      )
      .subscribe();
  }
}
