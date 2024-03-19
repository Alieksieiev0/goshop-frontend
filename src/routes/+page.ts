import camelcaseKeys from "camelcase-keys";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
    const res = await fetch('http://localhost:3000/products');
    let products = camelcaseKeys(((await res.json()) as P).data);

    return { products }
};



