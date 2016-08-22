export const makeInvoiceItem = x => {
  let { id=-1, invoice_id=-1, product_id=-1, quantity=1 } = x;
  return new InvoiceItem(id, invoice_id, product_id, quantity);
}

export class InvoiceItem {
  revenue: number;

  constructor(
    public id?: number, // = -1,
    public invoice_id: number, // = -1,
    public product_id: number, // = -1,
    public quantity: number, // = 1,
  ) {}

  set quantity(x: number) {
    this._quantity = x;
    this.combine();
  }
  get quantity(): number {
    return this._quantity;
  }

  set product(x: Product) {
    this._product = x;
    this.combine();
  }
  get product(): Product {
    return this._product;
  }

  combine() {
    this.revenue = this.quantity * (this.product ? this.product.price : 0);
  }

  // set revenue(x: number) {
  //   this._revenue = x;
  //   this.combine();
  // }
  // get revenue(): number {
  //   return this._revenue || this.quantity * (this.product ? this.product.price : 0);
  // }

}
