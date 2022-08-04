class Product {
  constructor(title, img, price, desc) {
    this.title = title;
    this.imageUrl = img;
    this.price = price;
    this.description = desc;
  }
}

class ShoppingCart {
  items = [];

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  addProduct(product) {
    this.items.push(product);
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount}</h2>`;
  }

  render() {
    const cartEl = document.createElement("section");
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Finalizar compra</button>
    `;
    cartEl.className = "cart";
    this.totalOutput = cartEl.querySelector("h2");
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    App.AddProductToCart(this.product);
  }

  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}">
          <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button>Agregar al carrito</button>
          </div>
        </div>
      `;

    const addCartBtn = prodEl.querySelector("button");
    addCartBtn.addEventListener("click", this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      "Baccio Classic F",
      "https://www.deceleste.com.uy/wp-content/uploads/2017/10/BACCIO-CLASSIC-F-SLIDE-1200x583.jpg",
      "1449",
      "Motor CG de 4 tiempos / 5 Velocidades / Arranque eléctrico y patada / Llantas de rayos / Freno de disco delantero"
    ),
    new Product(
      "Yumbo GS 200III",
      "https://www.deceleste.com.uy/wp-content/uploads/2016/11/Yumbo-GS200III-ROJA.jpg",
      "2350",
      "Motor CG de 4 tiempos con balanceador / 5 Velocidades / Arranque Eléctrico y patada / Freno: disco delantero / Llantas De aleación / LED"
    ),
  ];

  constructor() {}

  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById("app");
    this.cart = new ShoppingCart();
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();
    renderHook.append(cartEl, prodListEl);
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static AddProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
