import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "productos.txt";
  }

  static id = 0;

  writeProducts = async (productos) => {
    await fs.writeFile(this.path, JSON.stringify(productos), (error) => {
      if (error) throw error;
    });
  };

  readProducts = async () => {
    let allProducts = await fs.readFile(this.path, "utf-8");
    return JSON.parse(allProducts);
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    let newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    ProductManager.id++;
    this.products.push({
      ...newProduct,
      id: ProductManager.id,
    });

    await this.writeProducts(this.products);
  };

  getProducts = async () => {
    let productsAll = await this.readProducts();
    console.log(productsAll);
  };

  exist = async (id) => {
    let productsAll = await this.readProducts();
    return productsAll.find((product) => product.id === id);
  };

  getProductsById = async (id) => {
    (await this.exist(id))
      ? console.log(await this.exist(id))
      : console.log("NOT FOUND");
  };

  updateProduct = async ({ id, ...produt }) => {
    if ((await this.deleteProducts(id)) === false) {
      console.log("El Producto que intenta modificar no existe");
    } else {
      let prod = await this.readProducts();
      let modifiedProducts = [
        {
          id: id,
          ...produt,
        },
        ...prod,
      ];
      await this.writeProducts(modifiedProducts);
      console.log("Producto modificado Correctamente");
    }
  };
  deleteProducts = async (id) => {
    if (await this.exist(id)) {
      let products = await this.readProducts();
      let filterProducts = products.filter((prod) => prod.id != id);
      await this.writeProducts(filterProducts);
    } else {
      console.log("NOT FOUND");
      return false;
    }
  };
}

const productos = new ProductManager();

//Agregamos Productos
/*
productos.addProduct(
  "PRODUCTO 01",
  "Primer producto",
  150,
  "imagen.jpeg",
  "PR0001",
  5
);
productos.addProduct(
  "PRODUCTO 02",
  "Segundo producto",
  300,
  "imagen02.jpeg",
  "PR0002",
  3
);
*/

//Consultamos todos los Productos existentes
productos.getProducts();

//Consultamos un Producto por su ID
//productos.getProductsById(2);

//Actualizamos un Producto existente
/* productos.updateProduct({
  title: "Titulo 1",
  description: "Primer producto",
  price: 150,
  thumbnail: "imagen01.jpeg",
  code: "PR001",
  stock: 10,
  id: 1,
}); */

//eliminamos un Producto por su ID
//productos.deleteProducts(2);
