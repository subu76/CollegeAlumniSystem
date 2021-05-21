import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_SERVER_URL } from '../app.constants';
import { Course } from '../course/course.component';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getAllCourses(){

      return this.http.get<Course[]>(`${API_SERVER_URL}/alms/courses`);

  }

  deleteCourse(courseId) {

    return this.http.delete(`${API_SERVER_URL}/alms/courses/${courseId}`);

  }

  getCourseDetails(courseId) {

    return this.http.get<Course>(`${API_SERVER_URL}/alms/courses/${courseId}`);

  }

  updateCourse(courseId, course) {
  //  console.log('inside updatecourse in course.ts')
    return this.http.put(`${API_SERVER_URL}/alms/courses/${courseId}`, course);
  }
  addCourse(course) {
    return this.http.post(`${API_SERVER_URL}/alms/courses/`, course);
  }
}
