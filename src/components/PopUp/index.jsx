import classes from './PopUp.module.scss';

const PopUp = ({children, className: clsN, handlerPopUp, ...props}) => {
    return (
        <div className={clsN ? clsN + ' ' +  classes.overlay : classes.overlay} {...props} onClick={()=>handlerPopUp({isShowPopUp:false})}>
            <div className={clsN ? clsN + ' ' +  classes.popup : classes.popup} onClick={e => e.stopPropagation()}>
                <button className={classes.close_btn} onClick={()=>handlerPopUp({isShowPopUp:false})}></button>
                {children}
            </div>
        </div>
    );
}

export default PopUp;