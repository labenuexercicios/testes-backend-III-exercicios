import { Product } from "../../src/models/Product";

describe("testando a model product", () => {
    let product: Product
  beforeEach(() => {
    product = new Product(
      "p001",
      "tela gamer",
      9.9,
      new Date().toISOString()
    );
  });

  test("deve instanciar corretamente", () => {
    expect(product).toBeInstanceOf(Product);
  });

  test("deve encapsular id", () => {
    product.setId("p002");
    expect(product.getId()).toBe("p002");
  });

  test("deve encapsular name", () => {
    product.setName("cadeira gamer");
    expect(product.getName()).toBe("cadeira gamer");
  });

  test("deve encapsular price", () => {
    product.setPrice(200);
    expect(product.getPrice()).toBe(200);
  });

  test("deve encapsular createdAt", () => {
    const createdAt = new Date().toISOString()
    product.setCreatedAt(createdAt);
    expect(product.getCreatedAt()).toBe(createdAt);
  });
});
