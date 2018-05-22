import React, { Component } from 'react';
import './App.css';
import {Button, Grid, Col, Row, PageHeader, FormControl} from 'react-bootstrap'
import MapContainer from './MapContainer'

class App extends Component {
  render() {
    return (
      <div>
        <PageHeader className="text-center">Neighborhood Map App</PageHeader>
        <Grid fluid>
          <Row className="show-grid">      
            <Col xs={3} sm={3} md={3} lg={3} className="fill">
              <form>
                <FormControl
                  id="formControlsText"
                  type="text"
                  label="Text"
                  placeholder="Search ex: Restaurants, etc"
                />
              </form>
              <Button bsStyle="default">Default Button</Button>
            </Col>
            <Col xs={9} sm={9} md={9} lg={9} className="fill">
              <MapContainer />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
