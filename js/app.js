class Product {
  constructor(name, price, date) {
    this.name = name;
    this.price = price;
    this.date = date;
  }
}

class UI {
  addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body"> 
            <u> Nombre de Producto</u></> ⮕ ${product.name} .
            <u> Precio de Producto</u></> ⮕ ${product.price} .
            <u> Fecha de Producto</u></> ⮕  ${product.date} .

            <a href="#" style="border-radius: 1.5rem; width:6.6rem;" class="btn btn-danger" name="delete">Delete</a>
            </div>
        </div>
    `;
    productList.appendChild(element);
    this.resetForm();
  }

  resetForm() {
    document.getElementById("product-form").reset();
  }

  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.parentElement.remove();
      this.showMessage("Producto Eliminado", "danger");
    }
  }

  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));
    //MOSTRAR EN EL DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#App");
    container.insertBefore(div, app);
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 2000);
  }
}

//EVENTOS DOM

document
  .getElementById("product-form")
  .addEventListener("submit", function (e) {
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const date = document.getElementById("date").value;

    const product = new Product(name, price, date);
    const ui = new UI();

    if (name === "" || price === "" || date == ""){
      return ui.showMessage('Completar los campos vacios!', 'danger')
    }
    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage("Producto Añadido", "success");

    e.preventDefault();
  });

document.getElementById("product-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteProduct(e.target);
});

