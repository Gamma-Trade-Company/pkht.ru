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

class BlockHeader extends React.Component {
    render () {
        return (
            <h2 className="blockHeader">
                {this.props.children}
            </h2>
        );
    }
}

class Map extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {

        const {ymaps} = global;
        
        const init = () => {
            const myMap = new ymaps.Map(this.props.id, {
                center: this.props.center,
                zoom: this.props.zoom,
                controls: []
            });

            this.props.marks.forEach (mark => {
                const mapMark = new ymaps.Placemark(mark.location, {}, {
                    iconLayout: 'default#image',
                    iconImageHref: mark.img,
                    iconImageSize: mark.size,
                    iconImageOffset: mark.position
                });

                myMap.geoObjects.add(mapMark);
            });
        }

        ymaps.ready(init);
    }

    render () {
        return (
            <div className={this.props.className} id={this.props.id}>

            </div>
        )
    }
}

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

class ContactsBlock extends React.Component {
    render () {
        return (
            <PageWrapper>
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
            </PageWrapper>
        );
    }
}

export default ContactsBlock;