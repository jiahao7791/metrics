import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';
import { Button, ButtonGroup,ButtonToolbar } from 'reactstrap';
import { Loading } from './LoadingComponent';

function RenderCard({ item, isLoading, errMess }) {
    if (isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4>{errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else return (
        <Card>
            <CardImg src={item.image} alt={item.name} />
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                <CardSubtitle>{item.price.split(/\n/).map(line => <div key={line}>{line}</div>)}</CardSubtitle>
                <CardText>{item.description.split(/\n/).map(line => <div key={line}>{line}</div>)}</CardText>
            </CardBody>
        </Card>
    );

}

class Home extends Component {
    
    constructor(props) {
        super(props);

        this.state = { rSelected: 1 };
    
    }
    onRadioBtnClick(rSelected) {
        this.setState({ rSelected });
    }
    render() {

        return (
            <div className="container">
                <br/>
                <div class=" text-align:center">
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <Button color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>Sort By Popularity</Button>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <Button color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>Sort By Date</Button>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <Button color="primary" onClick={() => this.onRadioBtnClick(3)} active={this.state.rSelected === 3}>Sort By Price</Button>
                </div>
                <br/>
                {this.state.rSelected == 1 &&
                    <div className="row align-items-start">

                        <div className="col-12 col-md m-1">
                            <RenderCard item={this.props.course[0]} isLoading={this.props.courseLoading} errMess={this.props.courseErrMess} />
                        </div>
                        <div className="col-12 col-md m-1">
                            <RenderCard item={this.props.course[1]} isLoading={this.props.courseLoading} errMess={this.props.courseErrMess} />
                        </div>
                        <div className="col-12 col-md m-1">
                            <RenderCard item={this.props.course[2]} isLoading={this.props.courseLoading} errMess={this.props.courseErrMess} />
                        </div>
                    </div>

                }

                {this.state.rSelected == 2 &&
                    <div className="row align-items-start">
                        <div className="col-12 col-md m-1">
                            <RenderCard item={this.props.course[1]} isLoading={this.props.courseLoading} errMess={this.props.courseErrMess} />
                        </div>
                        <div className="col-12 col-md m-1">
                            <RenderCard item={this.props.course[2]} isLoading={this.props.courseLoading} errMess={this.props.courseErrMess} />
                        </div>
                        <div className="col-12 col-md m-1">
                            <RenderCard item={this.props.course[0]} isLoading={this.props.courseLoading} errMess={this.props.courseErrMess} />
                        </div>
                    
                    </div>

                }
                {this.state.rSelected == 3 &&

                    <div className="row align-items-start">
                         <div className="col-12 col-md m-1">
                            <RenderCard item={this.props.course[2]} isLoading={this.props.courseLoading} errMess={this.props.courseErrMess} />
                        </div>
                         <div className="col-12 col-md m-1">
                            <RenderCard item={this.props.course[1]} isLoading={this.props.courseLoading} errMess={this.props.courseErrMess} />
                        </div>
                       
                        <div className="col-12 col-md m-1">
                            <RenderCard item={this.props.course[0]} isLoading={this.props.courseLoading} errMess={this.props.courseErrMess} />
                        </div>
                       

                    </div>

                }

            </div>
        )
    }
}

export default Home;