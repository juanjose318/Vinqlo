import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private http: HttpClient, private router: Router) {}

  getProfileInfo(user) {
    return this.http
      .get<{ profile: any }>(`${environment.apiUrl}/profile/` + user.id)
      .pipe(map((data) => data));
  }

  updateProfileInfo(user) {
   console.log(user);
    let profileData : FormData;

    if(typeof user.file === 'object') {
      profileData = new FormData();
      let idStrg = user.id.toString();
      profileData.append('id', idStrg)
      profileData.append('degree', user.degree);
      profileData.append('campus', user.campus);
      profileData.append('bio', user.bio);
      profileData.append('twitter', user.twitter);
      profileData.append('instagram', user.instagram);
      profileData.append('facebook', user.facebook);
      profileData.append('phoneNumber' , user.phoneNumber);
      profileData.append('file', user.file);
    }

    else {
      profileData = new FormData();
      let idStrg = user.id.toString();
      profileData.append('id', idStrg)
      profileData.append('degree', user.degree);
      profileData.append('campus', user.campus);
      profileData.append('bio', user.bio);
      profileData.append('twitter', user.twitter);
      profileData.append('instagram', user.instagram);
      profileData.append('facebook', user.facebook);
      profileData.append('phoneNumber' , user.phoneNumber);
    }

    return this.http.put<{ message: string; profile: any }>(
      `${environment.apiUrl}/profile/` + user.id+ '/edit/',
      profileData
    ).subscribe((UserData) => {
      console.log(UserData)
    }
    );
  }
}
