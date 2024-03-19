import camelcaseKeys from "camelcase-keys";
import type { AutocompleteOption } from '@skeletonlabs/skeleton';

export async function search(q: string): Promise<AutocompleteOption<string>[]> {
    const options: AutocompleteOption<string>[] = [];
    if (!q) {
        return options;
    }

    const res = await fetch(`http://localhost:3000/categories?name=${q}`);
    let categories = camelcaseKeys(((await res.json()) as C).data);
    categories.forEach(category => options.push({ label: category.name, value: category.id }))
    return options
}
