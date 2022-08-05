import React from 'react';

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

export default Map;