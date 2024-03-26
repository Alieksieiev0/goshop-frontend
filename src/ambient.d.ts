type Product = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    name: string;
    description: string;
    code: string;
    price: number;
    categories: Category[];
};

type Category = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    name: string;
    description: string;
    parentId: number;
    parent: Category;
    products: Product[];

}

type ProductResponse = {
    data: Product;
}

type CategoryResponse = {
    data: Category;
}

type ProductsResponse = {
    data: Product[];
};

type CategoriesResponse = {
    data: Category[];
}

type ResponseError = {
    error: string
}

type ResponseToken = {
    token: string
}

type User = {
    id: string
    username: string
    email: string
    role: string
}

type ResponseUser = {
    data: User;
}

type TokenUser = {
    exp: number
    alg: string
    token: string
} & User
