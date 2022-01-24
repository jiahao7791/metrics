import React, { Component } from 'react';
import {
    Card, CardBody, CardText, CardImg,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { Control, Form, Errors, actions } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const InitialFeedback = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
    agree: false,
    contactType: 'Tel.',
    message: ''
};
function RenderCourse({ course }) {
    if (course != null) {
        return (
            <Card>
                <CardImg width="100%" src={course.image} alt={course.name} />
                <CardBody>
                    <CardTitle>{course.name}</CardTitle>
                    <CardText>{course.description}</CardText>
                </CardBody>
            </Card>
        );
    }
    else {
        return (
            <div> </div>
        );
    }
}
function RenderComments({ comments, commentsErrMess }) {
    if (commentsErrMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{commentsErrMess}</h4>
                </div>
            </div>
        );
    }
    else if (comments != null) {
        const item = comments.map((comment) => {
            return (
                <li >
                    <div className="mt-3">
                        {comment.comment}
                    </div>
                    <div className="mt-3">
                        --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                    </div>
                </li>
            );
        });
        return (
            <div>
                <h4>
                    Comments
        </h4>

                <ul className="list-unstyled">
                    {item}
                </ul>

            </div>


        )
    }
    else {
        return (
            <div></div>
        )
    }
}
class CourseDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleSubmit.bind(this);
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });

    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Your feedback has been submitted. ');
        //event.preventDefault();
        this.setState({ 
            ...InitialFeedback,
            isModalOpen: false 
           });
    }
    render() {
        if (this.props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>

                            <BreadcrumbItem><Link to="/courses">Courses</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.course.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.course.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-4 m-1">
                            <RenderCourse course={this.props.course} />
                        </div>
                        <div className="col-12 col-md-4 m-1">
                            <RenderComments comments={this.props.comments}
                                commentsErrMess={this.props.commentsErrMess}

                            />
                        </div>
                        <div className="col-12 col-md-2 m-1">
                            <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Book a slot</Button>
                            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                <ModalHeader toggle={this.toggleModal}>Book a slot</ModalHeader>
                                <ModalBody>
                                    <Form  model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                                        <Row className="form-group" >
                                            <Label htmlFor="name" md={2}>Name</Label>
                                            <Col md={10}>
                                                <Control.text model=".name" id="name" name="name"
                                                    placeholder="Name"
                                                    className="form-control"
                                                    validators={{
                                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                                    }}
                                                />

                                                <Errors
                                                    className="text-danger"
                                                    model=".name"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        minLength: 'Must be greater than 2 characters. ',
                                                        maxLength: 'Must be 15 characters or less. '
                                                    }}
                                                />

                                            </Col>
                                        </Row>
                                        
                                        <Row className="form-group">
                                            <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                            <Col md={10}>
                                                <Control.text model=".telnum" id="telnum" name="telnum"
                                                    placeholder="Tel. number"
                                                    className="form-control"
                                                    validators={{
                                                        required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".telnum"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        minLength: 'Must be greater than 2 numbers. ',
                                                        maxLength: 'Must be 15 numbers or less. ',
                                                        isNumber: 'Must be numbers only. '
                                                    }}
                                                />

                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Label htmlFor="email" md={2}>Email</Label>
                                            <Col md={10}>
                                                <Control.text model=".email" id="email" name="email"
                                                    placeholder="Email"
                                                    className="form-control"
                                                    validators={{
                                                        required, validEmail
                                                    }}
                                                />

                                                <Errors
                                                    className="text-danger"
                                                    model=".email"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        validEmail: 'Must be valid email. '
                                                    }}
                                                />

                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Label htmlFor="message" md={2}>When are you available?</Label>
                                            <Col md={10}>
                                                <Control.textarea model=".message" id="message" name="message"
                                                    rows="12"
                                                    className="form-control" />
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Col md={{ size: 10, offset: 2 }}>
                                                <Button type="submit" color="primary">
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </ModalBody>
                            </Modal>
                        </div>
                    </div>

                </div>
            )
        }
    }

}






export default CourseDetail;