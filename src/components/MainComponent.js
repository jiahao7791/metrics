import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Course from './CourseComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import CourseDetail from './CoursedetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { fetchTeachers, fetchCourses, fetchComments } from '../redux/ActionCreators';







const mapStateToProps = state => {
    return {
        courses: state.courses,
        teachers: state.teachers,
        comments: state.comments
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCourses: ()=>{dispatch(fetchCourses())},
    fetchTeachers: () => {dispatch(fetchTeachers())},
    fetchComments: ()=>{dispatch(fetchComments())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    resetBookSlotForm: () => { dispatch(actions.reset('bookSlot'))},
    
});

class Main extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        fetch("https://metrics-io.herokuapp.com/polls/")
          .then(res => res.json())
          .then(
            (result) => {
            console.log("RESULT")
            console.log(result)
              this.setState({
                isLoaded: true,
                items: result.items
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }
    componentDidMount() {
        this.props.fetchCourses();
        this.props.fetchTeachers();
        this.props.fetchComments();
    }

    render() {
        console.log("STATE")
        console.log(this.state)
        const HomePage = () => {
            return (
                <Home
                    course={this.props.courses.courses.filter((course)=>course.featured)}
                    courseLoading = {this.props.courses.isLoading}
                    courseErrMess={this.props.courses.errMess}
                />
            );
        }
        const CourseWithId = ({ match }) => {
            return (
                <CourseDetail course={this.props.courses.courses.filter((course) => course.id === parseInt(match.params.courseId, 10))[0]}
                    isLoading={this.props.courses.isLoading}
                    errMess={this.props.courses.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.courseId === parseInt(match.params.courseId,10))}
                    commentsErrMess={this.props.comments.errMess}
                />
            );
        };


        return (
            <div>
                <Header />
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route path='/aboutus' component={() => <About teachers={this.props.teachers} />} />
                            <Route exact path='/courses' component={() => <Course courses={this.props.courses} />} />
                            <Route path='/courses/:courseId' component={CourseWithId} />
                            <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                            <Redirect to='/home' />
                        </Switch>       
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));