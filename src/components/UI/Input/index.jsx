import { Component } from "react";
import classes from './Input.module.scss';
import ReactInputMask from "react-input-mask";

export default class Input extends Component {
    render() {
        const {label, id, onChange, className, type, mask = '+7 (999) 999 99 99', formatChars} = this.props;
        const {warning, datarequired, ...props} = this.props;
        delete props.label;
        delete props.groupName;
        return (
            <>
                {
                    type === 'tel' || className?.includes('counter-mask')? 
                    <ReactInputMask 
                        mask={mask}
                        {...props}
                        onChange={e=>onChange(this.props, e)}
                        className={`${className ? className : ''} ${classes.input} ${warning ? classes.warning : ''}`} /> : 
                    type === 'textarea' ? <textarea {...props}
                    className={`${className ? className : ''} ${classes.textarea} ${warning ? classes.warning : ''}`}
                    onChange={e=>onChange(this.props, e)} ></textarea>
                    : type !== 'hidden' ? <input 
                    {...props}
                    className={`${className ? className : ''} ${classes.input} ${warning ? classes.warning : ''}`}
                    onChange={e=>onChange(this.props, e)} /> :  <input 
                    {...props}
                    className={`${className ? className : ''} ${classes.input} ${warning ? classes.warning : ''}`}/>
                }

                {
                    label ? <label
                                className={`${className ? className : ''} ${classes.label}`}
                                htmlFor={id}>{label}</label> :
                            null
                }
            </>
        );
    }
}