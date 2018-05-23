import React from 'react';
import { FormControl, ListGroup, ListGroupItem } from 'react-bootstrap'

const Filter = ({listPlaces}) => {

    const onClick = evt => {
        console.log("clickado");
        console.log(evt.target);
    };

    return( 
        <div>
            <form>
                <FormControl
                    id="formControlsText"
                    type="text"
                    label="Text"
                    placeholder="Search ex: Restaurants, etc"
                />
            </form>
            <div className="fitted">
                <ListGroup>
                    {listPlaces.map((place) => (
                        <ListGroupItem key={place.id} onClick={onClick}>{place.name}</ListGroupItem>
                    ))}
                </ListGroup>
            </div>
        </div>
    )

};


export default Filter;