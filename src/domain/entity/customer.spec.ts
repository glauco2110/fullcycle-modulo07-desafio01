import Address from "./address";
import Customer from "./customer";

describe("Customer units test", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Glauco")
        }).toThrowError("ID cannot be empty")
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "")
        }).toThrowError("Name cannot be empty")
    });

    it("should change name", () => {
        const customer = new Customer("123", "Glauco");
        customer.changeName("Luana")
        expect(customer.name).toEqual("Luana");
    });

    it("should activate customer", () => {
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street Address", 1, "74910-620", "Aparecida de Goiania")
        customer.changeAddress(address);

        customer.activate();
        expect(customer.isActive()).toEqual(true);
    });

    it("should deactivate customer", () => {
        const customer = new Customer("1", "Customer 1");
        customer.deactivate();
        expect(customer.isActive()).toEqual(false);
    });

    it("should throw error when address is undefined when you activate customer", () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer")
    });

    it("shoult add reward points", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });



});