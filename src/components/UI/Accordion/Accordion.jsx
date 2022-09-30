import { useEffect, useRef, useState } from 'react';
import toggleSlide from '../../../utils/toggleSlide';
import classes from './Accordion.module.scss';

export default function Accordion({
    children,
    className,
    summary,
    summaryClass,
    bodyClass,
    open,
    duration = 300 }) {

    const [collapse, setCollapse] = useState(!open);
    const [firstRender, setFirstRender] = useState(true);
    const bodyOfAccorion = useRef(null);

    function handleClick({target}) {
        setCollapse(prevState => !prevState);
        if (target.classList.contains(classes.active)) {
            target.classList.remove(classes.active);
        } else {
            target.classList.add(classes.active);
        }
    }

    useEffect(()=>{
        const {current} = bodyOfAccorion;
        if (!firstRender) {
            toggleSlide(current, collapse, duration);
        }
        setFirstRender(false);
    }, [collapse]);
    
    return (
        <div
            className={
                !className ? classes.accordion :
                    `${classes.accordion} ${className}`}>
            <div
                className={
                    !summaryClass ? classes.summary :
                        `${classes.summary} ${summaryClass}`}
                onClick={handleClick}>
                {summary}
            </div>
            <div
                className={bodyClass}
                ref={bodyOfAccorion}
                style={collapse ? {display: 'none'}: {display: 'block'}}>
                {children}
            </div>
        </div>
    );
}