import React, { Component } from 'react';

class Foursquare extends Component {

    render() {
        return (
            <div>
                <h5>Foursquare Info:</h5>
                {this.props.placeInfo.length !== 0 ?
                    this.props.placeInfo.map(item => { 
                    return (
                        <div key={item.id}>
                            <div>Category: {item.categories[0].name}</div>
                            <div>This venue has <strong>{item.stats.checkinsCount} checkins</strong> and has been visited <strong>{item.stats.visitsCount} times</strong>.</div>
                        </div>
                    )}) 
                    : 
                    <div>No Foursquare info available for this venue. Be the first to check-in!</div>
                }
            </div>
        )
    }
}

export default Foursquare;
