import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toggleSlide from '../../../utils/toggleSlide';
import classes from './Accordion.module.scss';

export default function Accordion({
    children,
    className,
    summary,
    summaryClass,
    bodyClass,
    id,
    open,
    duration = 300 }) {

    const [collapse, setCollapse] = useState(!open);
    const [firstRender, setFirstRender] = useState(true);
    const bodyOfAccorion = useRef(null);

    const navigate = useNavigate();

    function handleClick({target}) {
        setCollapse(prevState => !prevState);
        const {id} = target;
        if (target.classList.contains(classes.active)) {
            target.classList.remove(classes.active);
            navigate(`/feedback/`);
        } else {
            if (id) {
                navigate(`/feedback/#${id}`);
            }
            target.classList.add(classes.active);
        }
    }

    const accordionBlock = useRef(null);

    useEffect(()=>{
        if (open) {
            const headerBottom = document.querySelector('header.header')?.getBoundingClientRect().bottom;
            window.scrollTo(0, accordionBlock.current.getBoundingClientRect().top + window.pageYOffset - headerBottom);
        }
    },[]);

    useEffect(()=>{
        const {current} = bodyOfAccorion;
        if (!firstRender) {
            toggleSlide(current, collapse, duration);
        }
        if (firstRender) {
            setFirstRender(false);
        }
    }, [collapse]);
    
    let classesStringSummary = !summaryClass ? classes.summary :
    `${classes.summary} ${summaryClass} `;
    if (!collapse) classesStringSummary += (' ' + classes.active);
    
    return (
        <div
            ref={accordionBlock}
            className={
                !className ? classes.accordion :
                    `${classes.accordion} ${className}`}>
            <div
                id={id}
                className={classesStringSummary}
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