import { NgModule } from '@angular/core';

import { UserHeaderComponent } from './components/user-header/user-header.component';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    ProfileRoutingModule
  ],
  exports: [],
  declarations: [UserHeaderComponent],
  providers: [],
})
export class ProfileModule { }
