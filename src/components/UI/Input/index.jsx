import { Component } from "react";
import classes from './Input.module.scss';
import ReactInputMask from "react-input-mask";

export default class Input extends Component {
    render() {
        const {label, id, onChange, className, type} = this.props;
        const {warning, ...props} = this.props
        delete props.label;
        delete props.groupName;
        return (
            <>
                {
                    type === 'tel' ? 
                    <ReactInputMask 
                        mask="+7 (999) 999 99 99"
                        {...props}
                        onChange={e=>onChange(this.props, e)}
                        className={`${className ? className : ''} ${classes.input} ${warning ? classes.warning : ''}`} /> : 
                    <input 
                    {...props}
                    className={`${className ? className : ''} ${classes.input} ${warning ? classes.warning : ''}`}
                    onChange={e=>onChange(this.props, e)} />
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