declare module MyApp {

  export type Customer = {
    id?: number,
    name: string,
    address: string,
    phone: string,
    invoices?: Invoice[],
  }

  export type Product = {
    id?: number,
    name: string,
    price: number,
  }

  export type Invoice = {
    id?: number,
    customer_id: number,
    discount: number,
    total: number,
    items?: InvoiceItem[],
  }

  export type InvoiceItem = {
    id?: number,
    invoice_id: number,
    product_id: number,
    quantity: number,
  }

}
