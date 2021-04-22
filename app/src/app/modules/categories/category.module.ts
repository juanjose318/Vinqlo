import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityFeedComponent } from '../communties/components/community-feed/community-feed.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: ':id', component: CommunityFeedComponent, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class CategoryModule {}
