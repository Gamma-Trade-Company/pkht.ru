import { Fragment } from 'react';
import { useState } from 'react';
import Button from '../UI/Button';
import InfoBlock from '../UI/InfoBlock';
import Input from '../UI/Input';
import classes from './FormOrder.module.scss';

const FormOrder = ({capcha, detailid, goodid}) => {
    const stateTemplate = {
        inputs: [
            {
                value: '',
                placeholder: 'ФИО *',
                type: 'text',
                warning: false,
                name: 'name',
                datarequired: true,
            },
            {
                value: '',
                placeholder: 'Телефон *',
                type: 'tel',
                warning: false,
                name: 'phone',
                mask: '+7 (999) 999 99 99',
                datarequired: true,
            },
            {
                value: '',
                placeholder: 'Введите проверочный код *',
                type: 'text',
                warning: false,
                name: 'check_code',
                datarequired: true,
                description: capcha,
            },
            {
                value: detailid,
                type: 'hidden',
                hidden: true,
                warning: false,
                name: 'detailid',
                datarequired: true,
            },
            {
                value: goodid,
                type: 'hidden',
                hidden: true,
                warning: false,
                name: 'goodid',
                datarequired: true,
            },
        ],
        agreementChecked: true,
        isValidFormFlag: true,
        afterSubmitting: 'none',
        errorTextInfo: 'Что-то пошло не так попробуйте позже',
        saccesTextInfo: 'Cпасибо за ваше обращение, с вами свяжутся позже',
    };
    const [state, setState] = useState(stateTemplate);

    const {inputs, errorTextInfo, saccesTextInfo} = state;

    function handlerChange(props, {target: {value}}) {
        const index = inputs.findIndex(elem => elem.name === props.name);
        if (index === -1) return;
        const input = {...inputs[index], value};
        const newInputs = [...inputs];
        newInputs[index] = input;
        setState({...state, inputs: newInputs});
    }

    function isValidForm(state, setState) {
        const {inputs} = state;
        const newInputs = inputs.map(input => {
            const {value, type, name, datarequired} = input;
            if (!datarequired) return {...input, warning: false};
            if (type !== 'email') {
                if (name === 'check_code' && Number(value) !== Number(capcha)) {
                    return {...input, warning: true};
                }
                
                return {...input, warning: !Boolean(value.trim())}
            } else {
                const regexp = /^[^а-я]+@[^а-я]+\.[^а-я\._'+;*^&=?~{}\-\.\/,\\]+$/i;
                return {...input, warning: !regexp.test(value)}
            }
        });

        

        setState(state => ({...state, inputs: newInputs}));

        return !(newInputs.some(({warning}) => warning));
    }

    function resetForm() {
        const {inputs} = state;
        const newInputs = inputs.map(input => (
            {...input, warning: false, value: ''}
        ));
        
        setState(state => ({...state, inputs: newInputs}));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const isValidFlag = isValidForm(state, setState);
        if (!isValidFlag || !state.agreementChecked) {
            setState(state => ({...state, isValidFormFlag: isValidFlag, afterSubmitting: 'none'}));
            return;
        }

        setState(state => ({...state, isValidFormFlag: true, afterSubmitting: 'none'}));

        try {
            const data = {};
            inputs.forEach((input)=>{
                data[input.name] = input.value;
            });

            const resp = await fetch('/ajax/order.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });
    
            const json = await resp.json();
            let success = saccesTextInfo;
            if ('error' in json) {
                setState(state => ({...state, errorTextInfo: json.error.length ? json.error : 'Что-то пошло не так попробуйте позже'}));
                throw new Error(json.error);
            } 
            if ('success' in json) success = json.success; 
            
            setState(state => ({...state, afterSubmitting: 'saccess', saccesTextInfo: success}));
            resetForm();
        } catch (error) {
            setState(state => ({...state, afterSubmitting: 'error'}));
            console.log(error);
        }
        
    }

    return <form className={classes.form} method="POST" onSubmit={handleSubmit}>
        {
                state.afterSubmitting !== 'none' ?
                <InfoBlock
                    className="form__offer-warning"
                    warning={state.afterSubmitting === 'saccess' ? false : true} >
                    {
                        state.afterSubmitting === 'saccess' ?
                        saccesTextInfo :
                        errorTextInfo
                    }
                </InfoBlock> :
                null
            }
            {
                !state.isValidFormFlag ? 
                <InfoBlock className="form__offer-warning" warning>
                    Неверно заполнены обязательные поля формы!
                </InfoBlock> :
                null
            }
        {
            inputs.map(props => (
                <Fragment key={props.name}>
                    {props.description ? <p className={classes.subtitle} dangerouslySetInnerHTML={{__html: props.description}}></p> : null }
                    <Input className={classes.input_elem} {...props} onChange={handlerChange} />
                </Fragment>
            ))
        }
        {
                !state.agreementChecked ?
                    <InfoBlock className="form__offer-warning" warning>
                        Вы не дали согласие на обработку персональных данных!
                    </InfoBlock> :
                    null
            }
        <div className={classes.agreement__wrap}>
                <Input
                    className="agreement__checkbox"
                    type="checkbox"
                    label
                    checked={state.agreementChecked}
                    name="agreement"
                    id="agreement3"
                    value="yes"
                    onChange={() => setState({ ...state, agreementChecked: !state.agreementChecked })} />
                <p className={classes.agreement__text}>
                    Настоящим подтверждаю, что я согласен
                    на обработку персональных данных, ознакомлен
                    и согласен с условиями политики конфиденциальности.
                </p>
        </div>
        <Button type="submit">Сделать заказ</Button>
    </form>
}

export default FormOrder;