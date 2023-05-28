import EventDispatcher from "../../@shared/event/event-dispatcher";
import SendConsoleLogWhenCustomerChangeAddressHandler
    from "./handler/send-console-log-when-customer-change-address.handler";
import Address from "../value-object/address";
import CustomerFactory from "../factory/customer.factory";

describe("CustomerChangeAddressEvent unit tests", () => {
    it("should create a CustomerChangeAddressEvent", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenCustomerChangeAddressHandler();

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler);
    });

    it("should notify a customer change address", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenCustomerChangeAddressHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

        const customer = CustomerFactory.createWithAddressAndNotify("Glauco", new Address("Street 1", 1, "12345-123", "City 1"), eventDispatcher);

        expect(spyEventHandler).toHaveBeenCalled();
    });
});