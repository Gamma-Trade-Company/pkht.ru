import React from 'react';
import BlockHeader from '../../components/blockHeader';
import ContactsBlock from '../../components/contactsBlock';
import PageWrapper from '../../components/pageWrapper';
import WhereToBuyLinks from '../../components/whereToBuyLinks';

class WhereToBuy extends React.Component {
    render () {
        return (
            <PageWrapper page="main">
                <BlockHeader>Где купить?</BlockHeader>
                <WhereToBuyLinks />
                <ContactsBlock />
            </PageWrapper>
        );
    }
}

export default WhereToBuy;