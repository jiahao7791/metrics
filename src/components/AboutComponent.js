import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Loading} from './LoadingComponent'
import {TEACHERS} from '../shared/teachers'



function About(props) {

    function RenderLeader({ teacher }) {
        return (

            
            <Media tag="li">
                <Media left middle>
                    <Media object src={ teacher.image} className='my_image' alt={teacher.name} />
                </Media>
                <Media body className="ml-5">
                    <Media heading>{teacher.name}</Media>
                    <p>{teacher.designation}</p>
                    <p>{teacher.description}</p>
                </Media>
            </Media>

        );
    }


    const teachers = props.teachers.teachers.map((teacher) => {
        return (
          <div className="col-12  ">
            <RenderLeader teacher={teacher} />
          </div>
        );
    });
    if (props.teachers.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.teachers.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4>{props.teachers.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }

    else


        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>About Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>About Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12 col-md-6">
                        <h2>Our Mission</h2>
                        <p>We aim to allow people to discover upcoming NFTs easily.</p>
                        <p>Why <strong>Choose Us</strong>?  Simply because we give the most accurate and comprehensive results about upcoming NFTs.</p>
                    </div>
                    <div className="col-12 col-md-5">
                        <Card>
                            <CardHeader className="bg-primary text-white">Totally not facts about Our company</CardHeader>
                            <CardBody>
                                <dl className="row p-1">
                                    <dt className="col-6">Started</dt>
                                    <dd className="col-6">3 Feb. 2020</dd>
                                    <dt className="col-6">Major Stake Holder</dt>
                                    <dd className="col-6">BANANA</dd>
                                    <dt className="col-6">Last Year's Turnover</dt>
                                    <dd className="col-6">$1,250,375</dd>
                                    <dt className="col-6">Employees</dt>
                                    <dd className="col-6">4</dd>
                                </dl>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 mt-5">
                        <Card>
                            <CardBody className="bg-faded">
                                <blockquote className="blockquote">
                                    <p className="mb-0">"Always Mint Monkeys"</p>
                                    <footer className="blockquote-footer">Random quote, 
                                <cite title="Source Title"> God of NFT</cite>
                                    </footer>
                                </blockquote>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h2>Company Staff</h2>
                    </div>
                    <div className="col-12">
                        <Media list>
                            {teachers}
                        </Media>
                    </div>
                </div>
            </div>
        );
}

export default About;