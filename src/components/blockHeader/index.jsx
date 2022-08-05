import React from 'react';

import './style.scss';
class BlockHeader extends React.Component {
    render () {
        return (
            <h2 className="blockHeader">
                {this.props.children}
            </h2>
        );
    }
}

export default BlockHeader;