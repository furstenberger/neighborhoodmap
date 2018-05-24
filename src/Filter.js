import React, {Component} from 'react';
import { ListGroup, ListGroupItem, DropdownButton, ButtonGroup, MenuItem } from 'react-bootstrap'
import PropTypes from 'prop-types';

class Filter extends Component {

    //propTypes to controle what is coming
    static propTypes = {
        listPlaces: PropTypes.array.isRequired,
        handlePlaces: PropTypes.func.isRequired
    };

    handlePlaces = (results) => {
        this.props.handlePlaces(results);
    }
    
    itemClick = (place, evt) => {
        evt.preventDefault();
        console.log("clickado");
        console.log(place);
        //console.log(evt.target);
    };

    filterClick = (filterName) => {
        
        console.log("filtro selecionado");
        console.log(filterName);
        //console.log(evt.target);
    };

    render() {

        let listPlaces = this.props.listPlaces;

        const filterParams = ["Delivery", "Bar", "Open Now", "Rating >= 4"]

        return( 
            <div>
                <ButtonGroup justified>
                    <DropdownButton
                        bsStyle="primary"
                        title="Choose a Filter"
                        key={1}
                        id="drop-filter"
                    >{filterParams.map((filterName, index) => (
                        <MenuItem 
                            eventKey={index} 
                            key={index}
                            onClick={this.filterClick.bind(this, filterName)}
                            >{filterName}</MenuItem>
                        ))
                    }
                        <MenuItem divider />
                        <MenuItem 
                            eventKey="5" 
                            key="5"
                            >Clear Filters</MenuItem>  
                    </DropdownButton>
                </ButtonGroup>
                <div className="fitted">
                    <ListGroup>
                        {listPlaces.map((place) => (
                            <ListGroupItem key={place.id} onClick={this.itemClick.bind(this, place)}>{place.name}</ListGroupItem>
                        ))}
                    </ListGroup>
                </div>
            </div>
        );
    }

};


export default Filter;