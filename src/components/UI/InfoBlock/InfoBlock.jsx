import classes from './InfoBlock.module.scss';

export default function InfoBlock({children, ...props}) {
    const {className, warning} = props;
    let htmlClassStr = className ? `${className} ${classes.infoBlock}` : classes.infoBlock;
    htmlClassStr += warning ? ` ${classes.warning}` : '';
    return (
        <p 
            className={htmlClassStr}>
            {children}
        </p>
    );
}