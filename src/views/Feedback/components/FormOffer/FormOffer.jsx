import { useState } from "react";
import Button from "../../../../components/UI/Button";
import Input from "../../../../components/UI/Input";
import scrollAnimate from '../../../../utils/scrollAnimate';
import InfoBlock from "../../../../components/UI/InfoBlock";
import './FormOffer.scss';


export default function FromOffer() {
    const [state, setState] = useState(stateTemplate);
    const {inputs, radioBtns} = state;

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

    function handleChangeArea({target: {value}}) {
        setState({...state, areaValue: value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const isValidFlag = isValidForm(state, setState);
        if (!isValidFlag || !state.agreementChecked) {
            setState(state => ({...state, isValidFormFlag: isValidFlag, afterSubmitting: 'none'}));
            if (state.agreementChecked) scrollAnimate(window, 0, 500);
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
            scrollAnimate(window, 0, 500);
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
            const {value, type} = input;
            if (type !== 'email') {
                return {...input, warning: !Boolean(value.trim())}
            } else {
                const regexp = /^[^??-??]+@[^??-??]+\.[^??-??\._'+;*^&=?~{}\-\.\/,\\]+$/i;
                return {...input, warning: !regexp.test(value)}
            }
        });

        setState(state => ({...state, inputs: newInputs, areaWarning: !Boolean(state.areaValue.trim())}));

        return !(newInputs.some(({warning}) => warning) || !Boolean(state.areaValue.trim()));
    }

    return (
        <form className="form__offer" onSubmit={handleSubmit}>
            <input hidden name="id_theme" defaultValue="1" />
            {
                state.afterSubmitting !== 'none' ?
                <InfoBlock
                    className="form__offer-warning"
                    warning={state.afterSubmitting === 'saccess' ? false : true} >
                    {
                        state.afterSubmitting === 'saccess' ?
                        `?????????????????? ?????? ???? ???????????????? ??????????` :
                        `??????-???? ?????????? ???? ?????? ???????????????????? ??????????`
                    }
                </InfoBlock> :
                null
            }
            {
                !state.isValidFormFlag ? 
                <InfoBlock className="form__offer-warning" warning>
                    ?????????????? ?????????????????? ???????????????????????? ???????? ??????????!
                </InfoBlock> :
                null
            }
            {
                inputs.map(props => (
                    <Input 
                        {...props} 
                        className="input__form"
                        key={props.name}
                        onChange={handleChang} />
                ))
            }
            {
                radioBtns.map(({title, checkedValue, name, formElems}) => (
                    <div className="radio__wrap" key={name}>
                        <p className="radio__wrap-title">{title}</p>
                        <div className="radio__inputs">
                            {
                                formElems.map(props => (
                                  <Input 
                                    {...props}
                                    name={name}
                                    key={props.id}
                                    checked={checkedValue === props.value}
                                    onChange={handleChang} />  
                                ))
                            }
                        </div>
                    </div>
                ))
            }
            <p className="conditions__title">
                ??????????????, ?????????? ?????????????????????? ?????????????? ???? ?????????????????????? ???????????? ????????????????????????
            </p>
            <textarea
                className={state.areaWarning ? `conditions__textarea warning` : 'conditions__textarea'}
                name="desc"
                value={state.areaValue}
                onChange={handleChangeArea} ></textarea>

            <Button className="btn__submit" type="submit">??????????????????</Button>
            {
                !state.agreementChecked ? 
                <InfoBlock className="form__offer-warning" warning>
                    ???? ???? ???????? ???????????????? ???? ?????????????????? ???????????????????????? ????????????!
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
                    id="agreement1"
                    value="yes"
                    onChange={()=> setState({...state, agreementChecked: !state.agreementChecked})} />
                <p className="agreement__text">
                    ?????????????????? ??????????????????????, ?????? ?? ????????????????
                    ???? ?????????????????? ???????????????????????? ????????????, ????????????????????
                    ?? ???????????????? ?? ?????????????????? ???????????????? ????????????????????????????????????.
                </p>
            </div>
        </form>
    );
}

const stateTemplate = {
    inputs: [
        {
            value: '',
            placeholder: '??????',
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
            placeholder: '??????????????',
            type: 'tel',
            warning: false,
            name: 'phone',
        },
        {
            value: '',
            placeholder: '???????????????? ??????????????????????',
            type: 'text',
            warning: false,
            name: 'name_org',
        },
    ],
    radioBtns: [
        {
            title: '?????????????????? ???? ???? ???????????????????????? ??????',
            checkedValue: '1',
            name: 'nds',
            formElems: [
                {
                    id: 'payer1',
                    value: '1',
                    type: 'radio',
                    label: '????',
                },
                {
                    id: 'payer2',
                    value: '2',
                    type: 'radio',
                    label: '??????',
                },
            ],
        },
        {
            title: '?????????????? ?????????????????????? ?????? (?????????????????????? ??????????????????????????????)',
            checkedValue: '1',
            name: 'edo',
            formElems: [
                {
                    id: 'edo1',
                    value: '1',
                    type: 'radio',
                    label: '????',
                },
                {
                    id: 'edo2',
                    value: '2',
                    type: 'radio',
                    label: '??????',
                },
            ],
        },
    ],
    areaValue: '',
    areaWarning: false,
    agreementChecked: true,
    isValidFormFlag: true,
    afterSubmitting: 'none'
};

