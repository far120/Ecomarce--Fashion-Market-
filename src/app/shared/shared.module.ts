import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


// Import all shared components, directives, and pipes here
const components: any[] = [
]


// Add any additional components, directives, or pipes as needed
const modules = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  RouterModule,
]

// SharedModule encapsulates all shared components, directives, and pipes
@NgModule({
  declarations: components,
  imports: modules,
  exports: [
    ...components,
    ...modules
  ]
})
export class SharedModule { }
