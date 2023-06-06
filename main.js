class ProductManager{
    constructor(){
        this.products=[];
    }

    static id=0;

    addProduct(titulo, descripcion, precio, imagen, codigo, existencia){
        for(let i= 0; i < this.products.length ; i++ ){
            if (this.products [i].codigo === codigo){
                console.log(`El codigo ${codigo} esta repetido`);
                break;
            }
        }
        
        const newProduct = {
            titulo,
            descripcion,
            precio,
            imagen,
            codigo,
            existencia,
        };

        if(!Object.values(newProduct).includes(undefined)){
            ProductManager.id++
            this.products.push({
                ...newProduct,
                id: ProductManager.id
            });
        }else{
            console.log("Todos los campos son requeridos")
        }

        /*
        ProductManager.id++
        this.products.push({
            titulo,
            descripcion,
            precio,
            imagen,
            codigo,
            existencia,
            id: ProductManager.id});
        */
    }

    getProduct(){
        return this.products;
    }

    existeId(id){
        return this.products.find((producto) => producto.id === id )
    }

    getProductById(id){
        !this.existeId(id) ? console.log("No existe") : console.log(this.existeId(id));
    }

}

const productos = new ProductManager

//Probar arreglo vacio
console.log(productos.getProduct())

//Agregar producto
productos.addProduct('titulo1','descripcion 1',1000, "imagen1","PROD001",5);
productos.addProduct('titulo2','descripcion 2',2000, "imagen2","PROD002",);

//Mostrar los productos
console.log(productos.getProduct())

//Validacion de codigo existente
productos.addProduct('titulo2','descripcion 2',2000, "imagen2","PROD002",11);

//Buscar producto por ID
productos.getProductById(2)

//Buscar producto por ID no encontrado
productos.getProductById(3)








