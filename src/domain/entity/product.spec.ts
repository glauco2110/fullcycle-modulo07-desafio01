import Product from "./product";

describe("Product units test", () => {

    it("should throw error when id is required", () => {
        expect(() => {
            const product = new Product("", "Product 1", 100);
        }).toThrow("Id is required");
    });
   
    it("should throw error when name is required", () => {
        expect(() => {
            const product = new Product("123", "", 100);
        }).toThrow("Name is required");
    });
    
    it("should throw error when price is less than zero", () => {
        expect(() => {
            const product = new Product("123", "123", -100);
        }).toThrow("Price must be greater than zero");
    });
    
    it("should change name", () => {
        const product = new Product("123", "Product 1", 5);
        product.changeName('Product 2');
        expect(product.name).toBe('Product 2');
    });
    
    it("should change price", () => {
        const product = new Product("123", "Product 1", 5);
        product.changePrice(150);
        expect(product.price).toBe(150);
    });
    
});