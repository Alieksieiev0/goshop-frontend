type Product = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    name: string;
    decsription: string;
    code: string;
    price: number;
    categoryId: string;
};

type Category = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    name: string;
    decsription: string;
    parentId: number;
    parent: Category;
    products: Product[];

}

type P = {
    data: Product[];
};

type C = {
    data: Category[];
}
