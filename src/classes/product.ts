export const makeProduct = x => {
  let { id=-1, name='Snazzy Widget', price=100 } = x;
  return new Product(id, name, price);
}

export class Product {
  constructor(
    public id?: number, // = -1,
    public name: string, // = 'Snazzy Widget',
    public price: number, // = 100,
  ) {}
}
