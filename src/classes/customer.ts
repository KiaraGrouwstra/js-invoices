export const makeCustomer = x => {
  let { id=-1, name='John Doe', address='Lane Str. 123', phone='0123456789' } = x;
  return new Customer(id, name, address, phone);
}

export class Customer {
  constructor(
    public id?: number, // = -1,
    public name: string, // = 'John Doe',
    public address: string, // = 'Lane Str. 123',
    public phone: string, // = '0123456789',
    // public invoices?: Invoice[],
  ) {}
}
