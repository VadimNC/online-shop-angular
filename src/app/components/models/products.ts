export interface IProducts {
  id: number,
  title: string,
  price: number,
  year: string,
  image?: string,
  configure: IProductsConfig;
  quantity: number;
}

export interface IProductsConfig {
  diameter: string,
  weight: string,
  material: string
}
