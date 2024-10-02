import { useEffect } from 'react';
import classes from './InfoBlock.module.scss';
import scrollAnimate from '../../../utils/scrollAnimate';
import { useRef } from 'react';

export default function InfoBlock({children, ...props}) {
    const {className, warning} = props;
    let htmlClassStr = className ? `${className} ${classes.infoBlock}` : classes.infoBlock;
    htmlClassStr += warning ? ` ${classes.warning}` : '';
    
    const block =   useRef(null);

    useEffect(()=>{
        const {current} = block;
        const headerBottom = document.querySelector('header.header')?.getBoundingClientRect().bottom;
        scrollAnimate(window, current.getBoundingClientRect().top + window.pageYOffset - headerBottom - 30, 500);
    },[])
    return (
        <p ref={block}
            className={htmlClassStr}>
            {children}
        </p>
    );
}