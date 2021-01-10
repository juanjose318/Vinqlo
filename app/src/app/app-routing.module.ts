import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailConfirmationComponent } from './email-confirmation/email-confirmation.component';
import { HomeComponent } from './home-component/home.component';
import { AuthGuard } from './modules/auth/auth.guards';
import { NotFoundComponent } from './not-found-component/not-found-component.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'feed',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/feed/feed.module').then((m) => m.FeedModule),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./modules/posts/post.module').then((m) => m.PostModule),
  },
  {
    path: 'category',
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('./modules/communties/community.module').then((m) =>m.CommunityModule),
  },
  {
    path:'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'emailConfirmation',
    component: EmailConfirmationComponent,

  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
