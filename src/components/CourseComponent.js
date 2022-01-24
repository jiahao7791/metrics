import React, { Component } from 'react';
import {
  Card, CardImg, CardImgOverlay,
  CardTitle, Breadcrumb, BreadcrumbItem, CardSubtitle
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';


function RenderCourseItem({ course }) {
  return (
    <Card>
      <Link to={`/courses/${course.id}`} >
        <CardImg width="100%" src={course.image} alt={course.name} />
        <CardImgOverlay>
          <CardTitle>{course.name}</CardTitle>
          <CardSubtitle>{course.price}</CardSubtitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}


const Course = (props) => {
  const course = props.courses.courses.map((course) => {
    return (
      <div className="col-12 col-md-5 m-1">
        <RenderCourseItem course={course} />
      </div>
    );
  });

  if (props.courses.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if (props.courses.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>{props.courses.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }

  else return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
          <BreadcrumbItem active>Courses</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>Courses</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        {course}
      </div>
    </div>
  );

}
export default Course;