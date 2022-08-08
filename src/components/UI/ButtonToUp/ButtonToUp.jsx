import React, { Component } from "react";
import scrollAnimate from "../../../utils/scrollAnimate";
import img from './scrollup-icon.svg';
import classes from './ButtonToUp.module.scss';

export default class ButtonToUp extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    render() {
        const className = [classes.btn];
        if (this.props.visible) className.push(classes.visible); 
        return (
            <button ref={this.myRef} className={className.join(' ')}>
                <img src={img} alt="scroll up" />
            </button>
        );
    }

    componentDidMount() {
        this.myRef.current.addEventListener('click', this.handlerClick);
    }

    handlerClick = () => {
        scrollAnimate(window, 0, 500);
    }

    componentWillUnmount() {
        this.myRef.current.removeEventListener('click', this.handlerClick);
    }
}