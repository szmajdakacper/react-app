import React, { useState } from 'react';
import axios from 'axios';
import FormProduct from './FormProduct';

export default function UpdateProduct(props) {
    const [productCode, setProductCode] = useState(props.productCode);
    const [productName, setProductName] = useState(props.productName);
    const [productDescription, setProductDescription] = useState(props.productDescription);
    const [productLine, setProductLine] = useState(props.productLine);
    const [buyPrice, setBuyPrice] = useState(props.buyPrice);
    const [updating] = useState(true);

    const updateProduct = (e) => {
        e.preventDefault();
        //Array to store input values
        let data = [];
        data['productCode'] = productCode;
        data['productName'] = productName;
        data['productDescription'] = productDescription;
        data['productLine'] = productLine;
        data['buyPrice'] = buyPrice;
        // rest data required for API
        data['_method'] = 'PUT';
        data['productScale'] = '0';
        data['productVendor'] = 'unknown';
        data['quantityInStock'] = '0';
        data['MSRP'] = '0';
        // console.log(data);
        var qs = require('qs');
        axios.post('https://myapi.szmajdakacper.eu/products/api/' + productCode, qs.stringify(data))
            .then((response) => {
                props.closeWindowEditProduct();
                props.fetchDataFromDB();
                // console.log(response);
            }, (error) => {
                console.log(error);
                alert('Something went wrong... Try again.');
                props.closeWindowEditProduct();
                props.fetchDataFromDB();
            });
    }


    const onChange = (e) => {
        switch (e.target.name) {
            case 'productCode':
                setProductCode(e.target.value);
                break;
            case 'productName':
                setProductName(e.target.value);
                break;
            case 'productDescription':
                setProductDescription(e.target.value);
                break;
            case 'productLine':
                setProductLine(e.target.value);
                break;
            case 'buyPrice':
                setBuyPrice(e.target.value);
                break;
            default:
                return 1;
        }
    }
    return (
        <div>
            <FormProduct
                productCode={productCode}
                productName={productName}
                productDescription={productDescription}
                productLine={productLine}
                buyPrice={buyPrice}
                updating={updating}
                submitButton='UPDATE'
                title='Update Product'
                onChange={onChange}
                submitted={updateProduct}
                closeWindow={props.closeWindowEditProduct} />
        </div>
    )
}
