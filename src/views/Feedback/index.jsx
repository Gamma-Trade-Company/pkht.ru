import Accordion from "../../components/UI/Accordion";
import FormFeedback from "./components/FormFeedback/FormFeedback";
import FormOffer from "./components/FormOffer/FormOffer";
import classes from './feedback.module.scss';

export default function Feedback() {
    return (
        <section style={{ marginTop: '3.3rem' }}>
            <div className="container">
                <h1 className={classes.title}>Обратная связь</h1>
                <Accordion
                    summary="Предложение сырья и комплектующих"
                    className={classes.accordion}>
                      <FormOffer/>
                </Accordion>
                <Accordion
                    summary="Отзыв на товар"
                    className={classes.accordion}>
                      <FormFeedback/>
                </Accordion>
            </div>
        </section>
    );
}