import CustomerFactory from "./customer.factory";
import Address from "../value-object/address";

describe("Customer factory unit tests", () => {

    it("should create a customer", () => {
        let customer = CustomerFactory.create("Glauco");
        expect(customer.id).toBeDefined();
        expect(customer.name).toEqual("Glauco");
        expect(customer.Address).toBeUndefined();
    });

    it("should create a customer with address", () => {
        const address = new Address("Street Address", 1, "74910-620", "Aparecida de Goiania");
        let customer = CustomerFactory.createWithAddress("Glauco", address)
        expect(customer.id).toBeDefined();
        expect(customer.name).toEqual("Glauco");
        expect(customer.Address).toBe(address);


    });

});