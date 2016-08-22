# Deliverables

Not fully broken anymore, but the invoice section is still pretty bad.

* Use standard Bootstrap components for the UI
  * tried Material to make things pretty/clean. sorry. :(
* Place all assets inside the /public directory. Do not create a separate application to serve your assets.
  * uhhhh Webpack is compiling them into /public, but pre-compilation ng2 source files are currently outside.
* The default page should be a list of existing invoices. This page should have a button for creating a new invoice.
  * implemented
* The invoice form should support selecting an existing Customer
  * implemented
* The invoice form should make it easy to browse and add existing Products (you should be able to add any number of products)
  * implemented
* When a Product is added there should be a way to edit the quantity
  * implemented
* There should be a place to enter a discount for the invoice (a percentage discount)
  * fix to % from $ earlier
* At the bottom of the page you should show a dynamically calculated invoice total. This total should take into account the quantity and price of each product and the invoice discount
  * not recalculating well yet
* As changes are made on the invoice form they should be automatically saved through the API (don't require use of a Save button)
  * implemented
* When you are done, please zip up the whole app directory with dependencies and upload it below.
  * ok

* From the invoice form, make it possible to add a new Customer that is not already in the system. It should be possible to add a name, .
  * todo :(
* From the invoice form, make it possible to add a new Product. It should be possible to add a name and price.
  * todo :(
* Make it possible to edit existing invoices.
  * already implemented from the start
* Create a page that lists existing customers with the ability to edit them
  * already implemented from the start
* Create a page that lists existing products with the ability to edit them
  * already implemented from the start
* When you are done, please zip up the whole app directory with dependencies and upload it below.

# Dependencies

- sqlite3
- node
- npm

# Getting Started

###### Install npm dependencies
`npm install`

###### Run the node server
`node app.js`

###### Viewing the application in your browser
`http://localhost:8000`

# Schema

## Customers

- id (integer)
- name (string)
- address (string)
- phone (string)


## Products

- id (integer)
- name (string)
- price (decimal)

## Invoices

- id (integer)
- customer_id (integer)
- discount (decimal)
- total (decimal)

## InvoiceItems

- id (integer)
- invoice_id (integer)
- product_id (integer)
- quantity (decimal)


# Resources

## Customers
```
GET|POST          /api/customers
GET|PUT|DELETE    /api/customers/{id}
```

## Products
```
GET|POST          /api/products
GET|PUT|DELETE    /api/products/{id}
```
## Invoices
```
GET|POST          /api/invoices
GET|PUT|DELETE    /api/invoices/{id}
```

## InvoiceItems
```
GET|POST          /api/invoices/{id}/items
GET|PUT|DELETE    /api/invoices/{invoice_id}/items/{id}
```
