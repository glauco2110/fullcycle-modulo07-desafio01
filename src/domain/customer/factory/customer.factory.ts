import Customer from "../entity/customer";
import {v4 as uuid} from "uuid";
import Address from "../value-object/address";
import EventInterface from "../../@shared/event/event.interface";
import CustomerCreatedEvent from "../event/customer-created.event";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import EventDispatcherInterface from "../../@shared/event/event-dispatcher.interface";
export default class CustomerFactory {
    public static create(name: string) : Customer {
        return new Customer(uuid(), name);
    }

    static createWithAddress(name: string, address: Address) : Customer {
        const customer = new Customer(uuid(), name);
        customer.changeAddress(address);
        return customer;
    }

    static createWithAddressAndNotify(name: string, address: Address, eventDispatcher: EventDispatcherInterface = new EventDispatcher()) : Customer {
        const customer = new Customer(uuid(), name);
        customer.changeAddress(address, eventDispatcher);
        return customer;
    }

    static createAndNotify(name: string, eventDispatcher: EventDispatcherInterface = new EventDispatcher()) {
        const customer = new Customer(uuid(), name);
        const customerCreatedEvent = new CustomerCreatedEvent(customer);
        eventDispatcher.notify(customerCreatedEvent);
        return customer;
    }
}