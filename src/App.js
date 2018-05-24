import React, { Component } from 'react';
import './App.css';
import {Grid, Col, Row, PageHeader} from 'react-bootstrap'
import MapContainer from './MapContainer'
import Filter from './Filter';

class App extends Component {
  
  constructor(props) {
    super(props)
    this.handlePlaces = this.handlePlaces.bind(this)
  }

  state = {
    listPlaces: []
  }
  
  handlePlaces = (places) => {
    this.setState({ listPlaces: places })
    console.log('este é o estado')
    console.log(this.state.listPlaces)
  }
  
  render() {

    return (
      <div>
        <PageHeader className="text-center">Neighborhood Map App</PageHeader>
        <Grid fluid>
          <Row className="show-grid">      
            <Col xs={3} sm={3} md={3} lg={3} className="fill">
              <Filter listPlaces={this.state.listPlaces} handlePlaces={this.handlePlaces.bind(this)}/>
            </Col>
            <Col xs={9} sm={9} md={9} lg={9} className="fill">
              <MapContainer listPlaces={this.state.listPlaces} handlePlaces={this.handlePlaces.bind(this)}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
