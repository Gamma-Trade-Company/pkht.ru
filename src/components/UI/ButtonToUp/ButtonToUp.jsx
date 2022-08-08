import React, { Component } from "react";
import scrollAnimate from "../../../utils/scrollAnimate";
import img from './scrollup-icon.svg';
import classes from './ButtonToUp.module.scss';

export default class ButtonToUp extends Component {
    render() {
        const className = [classes.btn];
        if (this.props.visible) className.push(classes.visible); 
        return (
            <button 
                className={className.join(' ')}
                onClick={()=>scrollAnimate(window, 0, 500)}>
                <img src={img} alt="scroll up" />
            </button>
        );
    }
}