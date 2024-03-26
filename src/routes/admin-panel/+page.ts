import camelcaseKeys from "camelcase-keys";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const res = await fetch('http://localhost:3000/products');
    const products = camelcaseKeys(((await res.json()) as ProductsResponse).data);
    return { products }
};



