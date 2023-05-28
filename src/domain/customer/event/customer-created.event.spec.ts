import EventDispatcher from "../../@shared/event/event-dispatcher";
import SendConsoleLog1WhenCustomerIsCreatedHandler from "./handler/send-console-log1-when-customer-is-created.handler";
import SendConsoleLog2WhenCustomerIsCreatedHandler from "./handler/send-console-log2-when-customer-is-created.handler";
import CustomerFactory from "../factory/customer.factory";
import CustomerCreatedEvent from "./customer-created.event";

describe("CustomerCreatedEvent unit tests", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1WhenCustomerIsCreatedHandler();
        const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);
    });

    it("should notify a created customer", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1WhenCustomerIsCreatedHandler();
        const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        const customer = CustomerFactory.createAndNotify("Glauco", eventDispatcher);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });
});