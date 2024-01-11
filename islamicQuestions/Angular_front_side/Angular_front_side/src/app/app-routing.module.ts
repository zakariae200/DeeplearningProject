import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { GradeComponent } from './grade/grade.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path:'',component: MainComponent},
  {path:'test',component: DefaultComponent},
  {path:'grade',component: GradeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
