import { NgModule } from '@angular/core';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTableComponent } from './data-table/data-table.component';
import { CustomersComponent } from './customers/customers.component';
import { RouterModule, Routes } from '@angular/router';


import { AdminComponent } from './admin.component';
import {MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatCardModule } from '@angular/material';

const routes: Routes = [
    {path: 'admin',
    component: AdminComponent,
    children: [
        {path: '', component: DataTableComponent},
        {path: 'customer-add', component: CustomersComponent},
    ]
}
  ]
@NgModule({
  declarations: [
    DataTableComponent,
    CustomersComponent,
    AdminComponent
  ],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule],
  providers: [],
  bootstrap: []
})
export class AdminModule { }
