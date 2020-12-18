import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../materials/material.module';
import { DescriptionBarComponent } from './description-bar/description-bar.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ DescriptionBarComponent ],
  declarations: [DescriptionBarComponent],
  providers: [],
})
export class UiKitModule { }
