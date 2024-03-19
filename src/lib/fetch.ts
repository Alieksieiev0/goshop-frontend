import camelcaseKeys from 'camelcase-keys';

export async function fetchProducts(): Promise<Product[]> {
    const res = await fetch('http://localhost:3000/products');
    let products = camelcaseKeys(((await res.json()) as ProductsResponse).data);

    return products
}
