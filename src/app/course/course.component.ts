import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../service/course.service';

export class Course {



 constructor(
   public courseId : number,
   public courseName : string,
   public duration : number

 ) {

 }
  

}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {

  courses: Course[];
  returnMessage:string;
  
  /*[
    new Course(1, "BSC Physics", 3),
    new Course(1, "BSC Maths", 3),
    new Course(1, "MSC Physics", 2)
    
  ]*/

  constructor(private courseService: CourseService, private route : Router) { }



  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(){

      this.courseService.getAllCourses().subscribe(
        response => {
          console.log(response);
          this.courses = response;
        },
        error => {

          this.handleErrorResponse(error);
        }
      );
  }

  handleErrorResponse(error){

    this.returnMessage = error;
    
    console.log(error);
    
  }

  deleteCourse(courseId){
    console.log('in delete course');
    this.courseService.deleteCourse(courseId).subscribe(
      response => {
        console.log(response);
        this.returnMessage = 'The course '+ courseId + ' is deleted succesfully';
        this.getAllCourses();
       // this.courses = response;
      },
      error => {

        this.handleErrorResponse(error);
      }
    );
  }

  updateCourse(courseId) {

    console.log('in update course '+courseId);
    console.log(`update ${courseId}`);
    this.route.navigate(['courses', courseId])

  }
  
  addCourse() {

    console.log('in add course ');    
    this.route.navigate(['courses', 0]);
  
    }

}
