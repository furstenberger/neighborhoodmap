import React, {Component} from 'react';
import { ListGroup, ListGroupItem, DropdownButton, ButtonGroup, MenuItem } from 'react-bootstrap'
import PropTypes from 'prop-types';

class Filter extends Component {

    //propTypes to controle what is coming
    static propTypes = {
        listPlaces: PropTypes.array.isRequired,
        handlePlaces: PropTypes.func.isRequired,
        handleAnimation: PropTypes.func.isRequired
    };

    handlePlaces = (results, isFiltered, isFirst) => {
        this.props.handlePlaces(results, isFiltered);
    }

    handleAnimation = (id) => {
        this.props.handleAnimation(id);
    }
    
    itemClick = (place, evt) => {
        evt.preventDefault();
        this.props.handleAnimation(place.id);
        console.log(place.id);
        console.log(evt.target);
    };

    filterClick = (filterName) => {

        // receive the filter that has been selected and update state
        let [places, isFiltered] = this.filter(this.props.listPlaces, filterName)
       
        this.handlePlaces(places, isFiltered, false);

    };

    filter = (listPlaces, filterCriteria) => {

        let filteredPlaces;
        // flag to signal that the array of places is from a filter; TRUE if filters apply; FALSE otherwise
        let filterStatus;

        if (filterCriteria === "Delivery") {
            filterStatus = true;
            filteredPlaces = this.props.listPlaces.filter((place) => {
                return place.types.find((type) => { return type === "meal_delivery" });
            })
        }

        if (filterCriteria === "Bar") {
            filterStatus = true;
            filteredPlaces = this.props.listPlaces.filter((place) => {
                return place.types.find((type) => { return type === "bar"} );
            })
        }

        if (filterCriteria === "Rating >= 4") {
            filterStatus = true;
            filteredPlaces = this.props.listPlaces.filter((place) => {
                return place.rating >= 4;
            })
        }

        if (filterCriteria === "Clear Filters") {
            filterStatus = false;
            filteredPlaces = this.props.listPlaces;
        }

        return [filteredPlaces, filterStatus];

    }

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
                            onClick={this.filterClick.bind(this, "Clear Filters")}
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