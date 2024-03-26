import { PUBLIC_BASE_URL } from '$env/static/public';
import camelcaseKeys from 'camelcase-keys';

export async function fetchProducts(): Promise<Product[]> {
    const res = await fetch(PUBLIC_BASE_URL + '/products');
    let products = camelcaseKeys(((await res.json()) as ProductsResponse).data);
    console.log(products)

    return products
}
