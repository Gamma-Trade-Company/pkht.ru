import classes from './Button.module.scss';

export default function Button({children, ...props}) {
    return (
        <button 
            {...props}
            className={props.className ? `${props.className} ${classes.btn}` : classes.btn}>
            {children}
        </button>
    );
}