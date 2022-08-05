import React from 'react';

class Map extends React.Component {
    constructor (props) {
        super(props);
    }

    #myMap = null;

    componentDidMount () {

        const {ymaps} = global;
        
        const init = () => {
            const myMap = this.#myMap = new ymaps.Map(this.props.id, {
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

            const mql = window.matchMedia('(max-width: 798px)');
            const screenTest = e => {
                if (e.matches) return myMap.behaviors.disable(['drag', 'scrollZoom']);
                myMap.behaviors.enable(['drag', 'scrollZoom']);
            }

            screenTest(mql);
            mql.addEventListener('change', screenTest);
        }

        ymaps.ready(init);
    }

    componentWillUnmount() {
        if (this.#myMap) this.#myMap.destroy();
    }

    render () {
        return (
            <div className={this.props.className} id={this.props.id}>

            </div>
        )
    }
}

export default Map;