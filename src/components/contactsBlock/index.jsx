import React from 'react';

import './style.scss';

import BlockHeader from '../blockHeader/';
import Map from '../map/';
import LocationBlock from './components/locationBlock/';

class ContactsBlock extends React.Component {
    render () {
        return (
            <>
                <BlockHeader>Контакты</BlockHeader>
                <div className="contactsBlock">
                    <div className="contactsBlock_text">
                        <LocationBlock
                            data={{
                                name: "Завод",
                                address: "152025, Ярославская область,<br />г. Переславль-Залесский,<br />пл. Менделеева, д. 2А, корпус 102",
                                phones: [
                                    {
                                        number: "+74957847788",
                                        text: "+7 495 784-77-88"
                                    },
                                    {
                                        number: "+748535200-38",
                                        text: "+7 48535 200-38"
                                    }
                                ]
                            }}
                        />
                        <LocationBlock data={{
                            name: "Офис",
                            address: "111024, Москва, Авиамоторная улица, 44с2",
                            phones: [
                                {
                                    number: "+74956686049",
                                    text: "+7 495 668-60-49"
                                }
                            ]
                        }}
                        />
                    </div>
                    <Map
                        className="contactsBlock_map"
                        id="mainPageMap"
                        center={[56.172734, 38.391277]}
                        zoom={7}
                        marks = {[
                            {
                                location: [56.756449, 38.900420],
                                img: '/img/ui/map-mark.svg',
                                size: [40, 50],
                                position: [-20, -50]
                            },
                            {
                                location: [55.738495, 37.719864],
                                img: '/img/ui/map-mark.svg',
                                size: [40, 50],
                                position: [-20, -50]
                            }
                        ]}
                     />
                </div>
            </>
        );
    }
}

export default ContactsBlock;