import React from 'react';

import './style.scss';

class AdvantageBlock extends React.Component {
    render () {

        const {title, text, className} = this.props;

        return (
            <div className={'advantageBlock' + (className ? " " + className : "")}>
                <h2 className='advantageBlock_title' dangerouslySetInnerHTML={{__html: title}} />

                <p className='advantageBlock_text' dangerouslySetInnerHTML={{__html: text}} />
            </div>
        )
    }
}

export default AdvantageBlock;