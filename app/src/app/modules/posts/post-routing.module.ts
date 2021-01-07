import { FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostSingleComponent } from '../posts/components/post-single/post-single.component';
import { PostDisplayComponent } from './components/post-display/post-display.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: ':id', component: PostSingleComponent, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
