import fs from "fs";

class ProductManager {
    constructor(path) {
        this.path = path
    }

    async readingJSON(){
        try{
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const dataJSON = JSON.parse(data);
            if (data === "") return []
            return dataJSON;
        }
        catch (error) {
            console.log(error);
        }
    }
    async dataSaving(item){
        try {
            const dataJSON = JSON.stringify(item);
            await fs.promises.writeFile(this.path, dataJSON);
        } 
        catch (error) {
            console.log(error);
        }
    }
    async addProducts(item){
        try {
            const products = await this.readingJSON();
            if(products.length){
                if(products.find( product => product.code === item.code )){
                    return console.log("El producto se encuentra agregado")
                } else {
                    let lastIndex = products.length - 1;
                    let lastId = products[lastIndex].id;
                    item.id = lastId + 1;
                    let id = item.id;
                    products.push(item);
                    this.dataSaving(products);
                    console.log("Producto agregado")
                    return id;
                }
            }
             else {
                item.id = 1;
                products.push(item);
                this.dataSaving(products);
                console.log("Producto agregado")
            }
        } 
        catch (error) {
            console.log(error);
        }
    }
    async getProducts(){
        try {
            const product = await this.readingJSON();
            if (product === "")
            return []
            console.log(product);
        } 
        catch (error) {
            console.log(error);
        }
    }
    async getProductsById(id){
        try {
            const product = await this.readingJSON();
            let productById;
            product.map(item => {
                item.id === id && (productById = item);
            });
            return productById ? console.log(productById) : console.log("Not Found");
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateProduct(item){
        try {
            const product = await this.readingJSON();
            const productId = product.findIndex(product => product.id === item.id)
            if(productId >= 0){
                product[productId] = item
                await this.dataSaving(product);
                console.log("update!");
            } else {
                console.log("Not Found");
            }
        } 
        catch (error) {
            console.log(error);
        }
    }
    async deleteProduct(id){
        try {
            const product = await this.readingJSON();
            const productId = product.findIndex(item => item.id === id);
            if(productId >= 0) {
                product.splice(1, productId);
                await this.dataSaving(product);
                console.log("Producto eliminado");
            } else {
                console.log("Not Found");
            }
        } 
        catch (error) {
            console.log(error);
        }
    }
}

const products = new ProductManager('./data/products.json');

await products.getProducts();

await products.addProducts({
    title:'Vaso de cristal',
    description:'cristal ultra resistente',
    price:2000,
    thumbnail:'Not found',
    code:'vasocristal',
    stock:87
});
await products.getProducts();

await products.addProducts({
    title:'vaso de plastico',
    description:'Ultra duradero',
    price:200,
    thumbnail:'Not Found',
    code:'vasoplastico',
    stock:128
});
await products.getProductsById(2);

await products.updateProduct({
    title:'producto UPGRADEADO',
    description:'Descripcion Upgradeada',
    price:666,
    thumbnail:'Not Found update',
    code:'update123',
    stock:30,
    id: 2
});

await products.getProducts();

await products.deleteProduct(2);

await products.getProducts();