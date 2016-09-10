export const makeInvoice = x => {
  let { id=-1, customer_id=-1, discount=0, total=0, items=[] } = x;
  return new Invoice(id, customer_id, discount, total, items);
}

export class Invoice {
  constructor(
    public id?: number, // = -1,
    public customer_id: number, // = -1,
    public discount: number, // = 0,
    public total: number, // = 0,
    public items?: InvoiceItem[],
  ) {}

  set items(x: InvoiceItem[]) {
    this._items = x;
    this.total = x.map(item => item.revenue/1).reduce((a,b) => a + b, 0) * (100 - this.discount) / 100;
  }
  get items(): Product {
    return this._items;
  }

}
