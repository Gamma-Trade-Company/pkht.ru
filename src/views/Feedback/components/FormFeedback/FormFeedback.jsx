import { useRef, useState } from "react";
import Input from "../../../../components/UI/Input";
import Button from "../../../../components/UI/Button";
import InfoBlock from "../../../../components/UI/InfoBlock";
import AgreementText from '../AgreementText';
import './FormFeedback.scss';

export default function FormFeedback() {
    const [state, setState] = useState(stateTemplate);
    const {inputs} = state;
    const formElem = useRef(null);

    function handleChang(props, {target: {value}}) {
        const index = inputs.findIndex(elem => elem.name === props.name);
        if (index === -1) return;
        const input = {...inputs[index], value};
        const newInputs = [...inputs];
        newInputs[index] = input;
        setState({...state, inputs: newInputs});
    }

    function handleChangeArea({target: {value}}) {
        setState({...state, areaValue: value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const isValidFlag = isValidForm(state, setState);
        const scrollDistance =  formElem.current ? 
                formElem.current.getBoundingClientRect().top + window.pageYOffset - 120 :
                0;
        if (!isValidFlag || !state.agreementChecked) {
            setState(state => ({...state, isValidFormFlag: isValidFlag, afterSubmitting: 'none'}));
            return;
        }

        const form = e.target;
        const formData = new FormData(form);
        formData.delete('agreement');
        setState(state => ({...state, isValidFormFlag: true, afterSubmitting: 'none'}));
        
        try {
            const resp = await fetch('/ajax/feedback.php', {
                method: 'POST',
                body: formData,
            });
    
            const json = await resp.json();
            if ('error' in json) throw new Error(json.error); 

            setState(state => ({...state, afterSubmitting: 'saccess'}));
            resetForm();
        } catch (error) {
            setState(state => ({...state, afterSubmitting: 'error'}));
            console.log(error);
        }
    }

    function isValidForm(state, setState) {
        const {inputs} = state;
        const newInputs = inputs.map(input => {
            const {value, type} = input;
            if (type !== 'email') {
                return {...input, warning: !Boolean(value.trim())}
            } else {
                const regexp = /^[^а-я]+@[^а-я]+\.[^а-я\._'+;*^&=?~{}\-\.\/,\\]+$/i;
                return {...input, warning: !regexp.test(value)}
            }
        });

        setState(state => ({...state, inputs: newInputs, areaWarning: !Boolean(state.areaValue.trim())}));

        return !(newInputs.some(({warning}) => warning) || !Boolean(state.areaValue.trim()));
    }

    function resetForm() {
        const {inputs} = state;
        const newInputs = inputs.map(input => (
            {...input, value: '', warning: false}
        ));

        setState(state => ({...state, inputs: newInputs, areaValue: ''}));
    }
    
    return (
        <form className="form__feedback" ref={formElem} onSubmit={handleSubmit}>
            <input type="hidden" name="id_theme" value="2" />
            {
                state.afterSubmitting !== 'none' ?
                <InfoBlock
                    className="form__offer-warning"
                    warning={state.afterSubmitting === 'saccess' ? false : true} >
                    {
                        state.afterSubmitting === 'saccess' ?
                        `Благодарм вас за обратную связь` :
                        `Что-то пошло не так попробуйте позже`
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
                    <Input 
                        {...props} 
                        className="input__form"
                        key={props.name}
                        mask={props.mask}
                        onChange={handleChang} />
                ))
            }
            <textarea 
                className={state.areaWarning ? `textarea__form warning` : 'textarea__form'}
                name="desc"
                placeholder="Отзыв или предложение"
                value={state.areaValue}
                onChange={handleChangeArea}
                >
            </textarea>
            <Button className="btn__submit" type="submit">Отправить</Button>
            {
                !state.agreementChecked ? 
                <InfoBlock className="form__offer-warning" warning>
                    Вы не дали согласие на обработку персональных данных!
                </InfoBlock> :
                null
            }
            <div className="agreement__wrap">
                <Input
                    className="agreement__checkbox" 
                    type="checkbox"
                    label
                    checked={state.agreementChecked}
                    name="agreement"
                    id="agreement2"
                    value="yes"
                    onChange={()=> setState({...state, agreementChecked: !state.agreementChecked})} />
                <div className="agreement__text">
                    <p>
                        Настоящим подтверждаю, что я согласен
                        на обработку персональных данных, ознакомлен
                        и согласен с условиями политики конфиденциальности.
                    </p>
                    <AgreementText/>
                </div>
            </div>
        </form>
    );
}

const stateTemplate = {
    inputs: [
        {
            value: '',
            placeholder: 'ФИО',
            type: 'text',
            warning: false,
            name: 'name',
        },
        {
            value: '',
            placeholder: 'E-mail',
            type: 'email',
            warning: false,
            name: 'email',
        },
        {
            value: '',
            placeholder: 'Телефон',
            type: 'tel',
            warning: false,
            name: 'phone',
            mask: '+7 (999) 999 99 99',
        },
    ],
    areaValue: '',
    areaWarning: false,
    agreementChecked: true,
    isValidFormFlag: true,
    afterSubmitting: 'none',
};