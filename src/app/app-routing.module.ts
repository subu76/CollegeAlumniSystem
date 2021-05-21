import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { ManagecourseComponent } from './managecourse/managecourse.component';
import { RouteGuardService } from './service/route-guard.service';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'welcome', component:WelcomeComponent, canActivate:[RouteGuardService]},
  {path:'welcome/:name', component:WelcomeComponent, canActivate:[RouteGuardService]},
  {path:'courses', component:CourseComponent, canActivate:[RouteGuardService]},
  {path:'courses/:courseId', component:ManagecourseComponent, canActivate:[RouteGuardService]},
  {path:'logout', component:LogoutComponent, canActivate:[RouteGuardService]},
  {path:'**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
