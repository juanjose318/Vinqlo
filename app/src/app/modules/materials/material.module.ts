import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    MatDividerModule,
    MatExpansionModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTabsModule,
  ],
  exports: [
    MatDividerModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
  ],
  declarations: [],
  providers: [],
})
export class MaterialModule {}
