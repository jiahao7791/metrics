import * as ActionTypes from './ActionTypes';
import {COURSES} from '../shared/courses';
import {TEACHERS} from '../shared/teachers';
import { COMMENTS } from '../shared/comments';


export const fetchCourses = () => (dispatch) => {

  dispatch(coursesLoading(true));

  setTimeout(() => {
      dispatch(addCourses(COURSES));
  }, 0);
}

export const coursesLoading = () => ({
    type: ActionTypes.COURSES_LOADING
});

export const coursesFailed = (errmess) => ({
    type: ActionTypes.COURSES_FAILED,
    payload: errmess
});

export const addCourses = (courses) => ({
    type: ActionTypes.ADD_COURSES,
    payload: courses
});

//teachers

export const fetchTeachers = () => (dispatch) => {

  dispatch(teachersLoading(true));

  setTimeout(() => {
      dispatch(addTeachers(TEACHERS));
  }, 0);
}

export const teachersLoading = () => ({
    type: ActionTypes.TEACHERS_LOADING
});

export const teachersFailed = (errmess) => ({
    type: ActionTypes.TEACHERS_FAILED,
    payload: errmess
});

export const addTeachers = (teachers) => ({
    type: ActionTypes.ADD_TEACHERS,
    payload: teachers
});

//comments

export const fetchComments = () => (dispatch) => {


  setTimeout(() => {
      dispatch(addComments(COMMENTS));
  }, 0);
}

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});
