import { Component } from "react";
import classes from './Input.module.scss';

export default class Input extends Component {
    render() {
        const {label, id, onChange, className} = this.props;
        const props = {...this.props}
        delete props.label;
        delete props.groupName;
        return (
            <>
                <input 
                    {...props}
                    className={`${className ? className : ''} ${classes.input}`}
                    onChange={()=>onChange(this.props)} />

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