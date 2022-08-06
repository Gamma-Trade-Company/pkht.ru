import React from 'react';

import './style.scss';

class PageWrapper extends React.Component {
    render () {
        const {page} = this.props;

        const template = page ? page : null;

        return (
            <div className={"pageWrapper" + (template ? " pageWrapper__"+template : "")}>
                {this.props.children}
            </div>
        );
    }
}

export default PageWrapper;