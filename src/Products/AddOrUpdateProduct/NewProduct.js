import React from 'react';
import axios from 'axios';
import FormProduct from './FormProduct';

export default function NewProduct(props) {

    //Array to store input values
    let data = [];

    const onChange = (event) => {
        data[event.target.name] = event.target.value;
    }

    const storeNewProduct = (event) => {
        event.preventDefault();
        // rest data required for API
        data['productScale'] = '0';
        data['productVendor'] = 'unknown';
        data['quantityInStock'] = '0';
        data['MSRP'] = '0';
        // console.log(data);
        var qs = require('qs');
        axios.post('https://myapi.szmajdakacper.eu/products/api', qs.stringify(data))
            .then((response) => {
                props.closeWindowNewProduct();
                props.fetchDataFromDB();
                // console.log(response);
            }, (error) => {
                console.log(error);
                alert('Something went wrong... Try again.');
                props.closeWindowNewProduct();
                props.fetchDataFromDB();
            });

    }
    return (
        <div>
            <FormProduct
                product={data}
                submitButton='ADD'
                title='Add New Product'
                onChange={onChange}
                submitted={storeNewProduct}
                closeWindow={props.closeWindowNewProduct} />
        </div>
    )
}
