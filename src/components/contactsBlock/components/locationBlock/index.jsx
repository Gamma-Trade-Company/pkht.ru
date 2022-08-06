import React from 'react';

import './style.scss';

class LocationBlock extends React.Component {
    render () {
        const {
            name,
            address,
            phones
        } = this.props.data;
        return (
            <div className="locationBlock" style={this.props.style}>
                <h3 className="locationBlock_name">{name}</h3>
                <p className="locationBlock_address" dangerouslySetInnerHTML={{__html: address}} />
                <ul className="locationBlock_phonesList">
                    {
                        phones.map(({number, text}, i) => (
                            <li className="locationBlock_phone" key={i}>
                                <a
                                    href={"tel:"+number}
                                    className="locationBlock_phoneLink"
                                >{text}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default LocationBlock;