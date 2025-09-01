export type Product = {
  products: [
    {
      id: number;
      title: string;
      description: string;
      thumbnail: string;
    }
  ]
}

export type ProductItem = Product["products"][0];
