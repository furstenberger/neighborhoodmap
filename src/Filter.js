import React, {Component} from 'react';
import { ListGroup, ListGroupItem, DropdownButton, ButtonGroup, MenuItem } from 'react-bootstrap'

class Filter extends Component {
    
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

        const filterParams = ["Delivery", "Bar", "Open Now", "Rating > 4"]

        return( 
            <div>
                <ButtonGroup justified>
                    <DropdownButton
                        bsStyle="primary"
                        title="Filter"
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