import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../course/course.component';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-managecourse',
  templateUrl: './managecourse.component.html',
  styleUrls: ['./managecourse.component.css']
})
export class ManagecourseComponent implements OnInit {

  course : Course;
  courseId : number;
  durationOptions : ["1","2","3","4","5"];

  constructor(private courseService: CourseService, 
    private route :  ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    
    console.log('inside ngOnIt')
    this.courseId = this.route.snapshot.params['courseId'];
    this.course = new Course(this.courseId, "", 0);
    if(this.courseId > 0) {
      this.getCourse();
    }
    console.log('courseName'+ this.course.courseName)
  }

  getCourse() {

    this.courseId = this.route.snapshot.params['courseId'];
    this.courseService.getCourseDetails(this.courseId).subscribe (
      data => this.course = data
    )
  }

  saveCourse() {

    console.log(this.courseId);
    this.courseService.updateCourse(this.courseId, this.course)    
    .subscribe (
      data =>{
        console.log(data);
        //this.course = data;
        this.router.navigate(['courses'])

    })

  }

    addCourse() {
    
      console.log(this.courseId);
      this.courseService.addCourse(this.course)    
      .subscribe (
        data =>{
          console.log(data);
          //this.course = data;
          this.router.navigate(['courses'])
  
      })
  
    
  }

}
