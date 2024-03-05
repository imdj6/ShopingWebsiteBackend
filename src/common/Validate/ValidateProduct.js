function validateProductData(product) {
    const { name, description, price, stock, category } = product;
    const errors = [];

    if (!name || !description || !price || !stock || !category) {
        errors.push("All fields are required");
    }

    if (typeof price !== "number" || price <= 0) {
        errors.push("Price must be a positive number");
    }

    if (typeof stock !== "number" || stock < 0) {
        errors.push("Stock must be a non-negative number");
    }

    return errors;
}

module.exports={validateProductData}