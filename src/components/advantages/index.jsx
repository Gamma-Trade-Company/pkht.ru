import React from "react";

import './style.scss';

import AdvantageBlock from './advantageBlock/';
import BlockHeader from "../blockHeader";
import { Link } from "react-router-dom";

class Advantages extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            advantages: [
                {
                    title: "Собственная<br>научно-исследовательская<br>лаборатория",
                    text: "Производственные цеха<br>и оборудование соответствует запросам времени и пожарной безопасности."
                },
                {
                    title: "ОТК",
                    text: "Служба лаборатории «ОТК» организованна по стандарту системы менеджмента качества."
                },
                {
                    title: "Активная работа<br>с художниками",
                    text: "Благодаря качественным товарам<br />нас выбирают многие художники, иллюстраторы и дизайнеры."
                },
                {
                    title: "Современное<br>оборудование",
                    text: "Производство оснащено Европейским оборудованием с высокой степенью автоматизации, влияющей на точность и скорость в рамках технологического процесса."
                }
            ]
        }
    }

    render () {
        return (
            <div className="advantages">
                <div className="advantages_header">
                    <BlockHeader>Преимущества</BlockHeader>
                    {/* <Link to={"/"}></Link> */}
                    <span></span>
                </div>
                <div className="advantages_list">
                    {
                        this.state.advantages.map((advantage, i) => (
                            <AdvantageBlock
                                {...advantage}
                                key={i}
                                className="advantages_item"
                            />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default Advantages;