import { Fragment, useState } from "react";
import Button from "../../../../components/UI/Button";
import Input from "../../../../components/UI/Input";
import InfoBlock from "../../../../components/UI/InfoBlock";
import classes from './formOrder.module.scss';

export default function FormOrder() {
    const [state, setState] = useState(stateTemplate);
    const { inputs, radioBtns } = state;

    function handleChang(props, {target: {value}}) {
        if (props.type !== 'radio') {
            const index = inputs.findIndex(elem => elem.name === props.name);
            if (index === -1) return;
            const input = {...inputs[index], value};
            const newInputs = [...inputs];
            newInputs[index] = input;
            setState({...state, inputs: newInputs});
        } else {
            const index = radioBtns.findIndex(elem => elem.name === props.name);
            if (index === -1) return;
            const radioBtn = {...radioBtns[index], checkedValue: value};
            const newRadioBtns = [...radioBtns];
            newRadioBtns[index] = radioBtn;
            setState({...state, radioBtns: newRadioBtns});
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const isValidFlag = isValidForm(state, setState);
        if (!isValidFlag || !state.agreementChecked) {
            setState(state => ({...state, isValidFormFlag: isValidFlag, afterSubmitting: 'none'}));
            // if (state.agreementChecked) scrollAnimate(window, 0, 500);
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
        } finally {
            // scrollAnimate(window, 0, 500);
        }
        
    }

    function resetForm() {
        const {inputs, radioBtns} = state;
        const newInputs = inputs.map(input => (
            {...input, warning: false, value: ''}
        ));
        const newRadioBtns = radioBtns.map(radioBtn => (
            {...radioBtn, checkedValue: '1'}
        ));
        
        setState(state => ({...state, inputs: newInputs, radioBtns: newRadioBtns, areaValue: ''}));
    }

    function isValidForm(state, setState) {
        const {inputs} = state;
        const newInputs = inputs.map(input => {
            const {value, type, datarequired} = input;
            if (!datarequired) return {...input, warning: false};
            if (type !== 'email') {
                return {...input, warning: !Boolean(value.trim())}
            } else {
                const regexp = /^[^а-я]+@[^а-я]+\.[^а-я\._'+;*^&=?~{}\-\.\/,\\]+$/i;
                return {...input, warning: !regexp.test(value)}
            }
        });

        setState(state => ({...state, inputs: newInputs}));

        return !(newInputs.some(({warning}) => warning));
    }

    return (
        <form className="form__order" style={{'padding-top': '1em'}} onSubmit={handleSubmit}>
            <input hidden name="id_theme" defaultValue="3" />
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
                radioBtns.map(({title, checkedValue, name, formElems}) => (
                    <div className="radio__wrap" key={name}>
                        <div className={classes.radio__inputs}>
                            {
                                formElems.map((props, i) => (
                                  <Fragment key={props.id}>
                                    <Input 
                                    {...props}
                                    name={name}
                                    checked={checkedValue === props.value}
                                    onChange={handleChang} />
                                    <p className={classes.subtitle}>
                                        {props.subtitle}
                                    </p>
                                  </Fragment> 
                                     
                                ))
                            }
                        </div>
                    </div>
                ))
            }
            {
                radioBtns[0].checkedValue === '1' ?
                inputs.map(props => (
                    <Fragment key={props.name}>
                        {props.description ? <p className={classes.subtitle} dangerouslySetInnerHTML={{__html: props.description}}></p> : null }
                        <Input 
                            {...props} 
                            className={classes.input__form + ` ${props.className ?? ''}`}
                            onChange={handleChang} />
                            
                    </Fragment>
                )) : <p>Заказ временно недоступен.</p>
            }
            {
             radioBtns[0].checkedValue === '1' ?  <Button className={classes.btn__submit} type="submit">Отправить</Button> : null 
            }
            {
                !state.agreementChecked ?
                    <InfoBlock className="form__offer-warning" warning>
                        Вы не дали согласие на обработку персональных данных!
                    </InfoBlock> :
                    null
            }
            {
               radioBtns[0].checkedValue === '1' ? <div className={classes.agreement__wrap}>
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
            </div> : null
            }
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
            datarequired: true,
        },
        {
            value: '',
            placeholder: 'E-mail',
            type: 'email',
            warning: false,
            name: 'email',
            datarequired: true,
        },
        {
            value: '',
            placeholder: 'Телефон',
            type: 'tel',
            warning: false,
            name: 'phone',
            mask: '+7 (999) 999 99 99',
            datarequired: true,
        },
        {
            value: '',
            placeholder: 'Укажите ссылку на товар *',
            type: 'text',
            warning: false,
            name: 'product_link',
            datarequired: true,
            description: `Выберите на сайте <a href="https://firma-gamma.ru/" target="_blank" rel="noopener noreferrer">https://firma-gamma.ru/</a> товар, аналог которого вы хотите создать`
        },
        {
            value: '',
            placeholder: 'Количество для заказа',
            type: 'textarea',
            warning: false,
            datarequired: true,
            name: 'count_order',
            description: `Сколько штук нужно изготовить, будет ли этот заказ периодическим или разовым`,
        },
        {
            value: '',
            placeholder: 'Основные характеристики товара',
            type: 'textarea',
            description: `Например, цветовая палитра, количество цветов, перечень цветов или другие особенности товара `,
            warning: false,
            datarequired: true,
            name: 'characteristic_prod',
        },
        {
            value: '',
            placeholder: 'Характеристики тары или вид тары',
            type: 'textarea',
            description: `Например, ведро/банка/туба/коробочка/пакет и т.д.; материал PP, PET и т.д., цвет тары; если крышка и банка разного цвета - указать каждый цвет`,
            warning: false,
            datarequired: true,
            name: 'characteristic_container',
        },
        {
            value: '',
            placeholder: 'Характеристики этикетки',
            type: 'textarea',
            description: `Где должна быть этикетка, какой цвет, размер, плотность этикетки или стандартная, как на указанном аналоге`,
            warning: false,
            datarequired: true,
            name: 'characteristic_label',
        },
        {
            value: '',
            placeholder: 'Пожелания по упаковке',
            type: 'textarea',
            description: `Коробка или пакет, нужна ли дополнительная промежуточная упаковка и т.д.`,
            warning: false,
            datarequired: true,
            name: 'suggestions',
        },
        {
            value: '',
            placeholder: 'Дополнительные требования',
            type: 'textarea', 
            datarequired: false,
            warning: false,
            name: 'add_requirements',
        },
    ],
    radioBtns: [
        {
            // title: 'Являетесь ли вы плательщиком НДС',
            checkedValue: '1',
            name: 'order',
            formElems: [
                {
                    id: 'order1',
                    value: '1',
                    type: 'radio',
                    label: 'Стандартный товар',
                    subtitle: 'Стандарный товар - товар по уже ранее разработанной на производстве рецептуре/технологии; с возможностью изменения упаковочной тары(наверное упаковки, тары) и этикетки под заказчика.',
                },
                {
                    id: 'order2',
                    value: '2',
                    type: 'radio',
                    label: 'Нестандартный товар',
                    subtitle: 'Нестандартный товар - товар, полностью разрабатываемый под заказчика (рецептура, технология, упаковочная тара, этикетка).',
                },
            ],
        },
    ],
    agreementChecked: true,
    isValidFormFlag: true,
    afterSubmitting: 'none'
};