import EventInterface from "../../@shared/event/event.interface";
import Product from "../entity/product";

export default class ProductCreatedEvent implements EventInterface {
    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: Product) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }

}