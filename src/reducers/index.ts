import { Action, Dispatcher } from '@ngrx/store';

// ProductActionCreator
import pac from '../actions/product';
// CustomerActionCreator
import cac from '../actions/customer';
// InvoiceActionCreator
import iac from '../actions/invoice';

var productTable = {
    [ pac.SEARCH_RESULT ]: ( state, action ) => {
        return { products: action.payload };
    }
    ,[ pac.CREATE_RESULT ]: ( state, action ) => {
        return { products: (state.products || []).concat(action.payload) };
    }
    ,[ pac.REMOVE_RESULT ]: ( state, action ) => {
        return { products: (state.products || []).filter( (p)=>p.id!=action.payload.id ) }; 
    }
};

var customerTable = {
    [ cac.SEARCH_RESULT ]: ( state, action ) => {
        return { customers: action.payload };
    }
    ,[ cac.CREATE_RESULT ]: ( state, action ) => {
        return { customers: (state.customers || []).concat(action.payload) };
    }
    ,[ cac.REMOVE_RESULT ]: ( state, action ) => {
        return { customers: (state.customers || []).filter( (c)=>c.id!=action.payload.id ) };
    }
};

var invoiceTable = {
    [ iac.SEARCH_RESULT ]: ( state, action ) => {
        return { invoices: action.payload };
    }
    ,[ iac.CREATE_RESULT ]: ( state, action ) => {
        return { invoices: (state.invoices || []).concat(action.payload) };
    }
    ,[ iac.REMOVE_RESULT ]: ( state, action ) => {
        return { invoices: (state.invoices || []).filter( (i)=>i.id!=action.payload.id ) };
    }
    ,[ iac.SEARCH_ITEM_RESULT ]: ( state, action ) => {
        return { invoice_items: action.payload };
    }
    ,[ iac.CREATE_ITEM_RESULT ]: ( state, action ) => {
        return { invoice_items: (state.invoice_items || []).concat(action.payload) };
    }
    ,[ iac.REMOVE_ITEM_RESULT ]: ( state, action ) => {
        return { invoice_items: (state.invoice_items || []).filter( (i)=>i.id!=action.payload.id ) };
    }
};

export default function( state, action: Action ) {
    console.warn( '>reducer', state, action );
    var fn;
    var nextProduct = ( fn = productTable[ action.type ] ) && fn( state, action ) || {};
    var nextCustomer = ( fn = customerTable[ action.type ] ) && fn( state, action ) || {};
    var nextInvoice = ( fn = invoiceTable[ action.type ] ) && fn( state, action ) || {};
    return Object.assign( {}, state, nextProduct, nextCustomer, nextInvoice );
};