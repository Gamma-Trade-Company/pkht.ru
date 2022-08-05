import React from 'react';

import './style.scss';

class PageWrapper extends React.Component {
    render () {
        return (
            <div className="pageWrapper">
                {this.props.children}
            </div>
        );
    }
}

export default PageWrapper;