import { useState } from "react";
import Accordion from "../../../../components/UI/Accordion";
import classes from './AgreementText.module.scss';

export default function AgreementText() {
    const stateText = {
        AccordionSummary: 'Показать' 
    }
    const [state, setState] = useState(stateText);
    return (
        <a className={classes.accordionWrap} href="https://pkht.ru/uploads/politika.pdf" target="_blank">Политика обработки персональных данных</a>
        // <Accordion
        //     summary={state.AccordionSummary}
        //     open={false}
        //     className={classes.accordionWrap}
        //     onClick={() => setState(() => ({ ...state, AccordionSummary: state.AccordionSummary === 'Показать' ? 'Скрыть' : 'Показать' }))}>
        //     <p>
        //         <strong>Согласие на обработку персональных данных</strong> <br />
        //         Настоящим при размещении (вводе) своих персональных данных на интернет-сайте pkht.ru даю свое согласие ООО «Аква плюс»
        //         (152025, Ярославская область, г. Переславль-Залесский, пл. Менделеева, д. 2А, корпус 102), которому принадлежит сайт pkht.ru, на обработку своих персональных данных,
        //         указанных при регистрации и в анкете, и подтверждаю, что даю такое согласие, действуя по своей воле и в своих интересах.
        //         <br /><br />
        //         <b>1.</b> Согласие на обработку персональных данных Пользователя дается только и исключительно с целью заключения или исполнения
        //         договора купли-продажи товаров в интернет-магазине «Переславский комбинат художественных товаров», для передачи информационных
        //         и рекламных смс-сообщений и/или рассылок «Переславский комбинат художественных товаров» по электронной почте, указанной Пользователем при регистрации, о мероприятиях,
        //         товарах и акциях интернет-магазина «Переславский комбинат художественных товаров», а также для ответов на обращения Пользователя через форму обратной связи на сайте.
        //         <br /><br />
        //         <b>2.</b> Настоящее согласие предоставляется на осуществление любых действий в отношении персональных данных, которые необходимы
        //         для достижения вышеуказанной цели, включая, без ограничения, сбор, систематизацию, накопление, хранение, уточнение (обновление, изменение),
        //         использование, распространение (в том числе передача), обезличивание, блокирование, уничтожение, в том числе, с применением средств автоматизации
        //         и с привлечением для обработки третьих лиц, а также осуществление любых иных действий с персональными данными с учетом действующего законодательства
        //         Российской Федерации об обеспечении конфиденциальности персональных данных и безопасности персональных данных при их обработке.
        //         <br /><br />
        //         <b>3.</b> Настоящее согласие на обработку персональных данных дается бессрочно и может быть отозвано посредством
        //         направления письменного заявления в адрес ООО «Аква плюс» по адресу, указанному выше.
        //         <br /><br />
        //         <b>4.</b> Настоящим подтверждаю достоверность информации, указанной мною при регистрации
        //         на сайте pkht.ru и в анкете.
        //         <br /><br />
        //         <b>5.</b> Настоящим признаю и подтверждаю, что с правами и обязанностями в соответствии с Федеральным законом «О персональных данных»,
        //         в т. ч. порядком отзыва согласия на обработку персональных данных ознакомлен.
        //     </p>
        // </Accordion>
    );
}