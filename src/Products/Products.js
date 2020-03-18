import React, { useState } from 'react'
import styleClasses from './Products.module.css'
import axios from 'axios';
import Pagination from './ProductComponents/Pagination';
import UpdateProduct from './AddOrUpdateProduct/UpdateProduct';


export default function Product(props) {
    // Veriable for editing products
    const [editProduct, setEditProduct] = useState(false);
    const [productCode, setProductCode] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productLine, setProductLine] = useState('');
    const [buyPrice, setBuyPrice] = useState('');

    // while fetching data from DB display: Loading... 
    if (props.loading) {
        return (
            <h1>Loading...</h1>
        );
    }

    //Delete Product
    const deleteProduct = (productCode) => {
        // console.log(productCode);
        var qs = require('qs');
        axios.post('https://myapi.szmajdakacper.eu/products/api/' + productCode, qs.stringify({ '_method': 'DELETE' }))
            .then((response) => {
                // console.log(response);
                props.fetchDataFromDB();
            }, (error) => {
                console.log(error);
                alert('Something went wrong... Try again.');
                props.fetchDataFromDB();
            });
    }

    // Editing Product
    // Clicked button: edit product
    const editProductHandler = (productCode, productName, productDescription, productLine, buyPrice) => {
        setProductCode(productCode);
        setProductName(productName);
        setProductDescription(productDescription);
        setProductLine(productLine);
        setBuyPrice(buyPrice);
        setEditProduct(true);
    }
    // Closed window: Edit Product
    const closeWindowEditProduct = () => {
        setEditProduct(false);
    }

    //filter products by categories
    let productsByCategory = [];
    if (props.category !== 'all') {
        productsByCategory = props.products.filter(product => {
            return product.productLine === props.category;
        });
    } else {
        productsByCategory = props.products;
    }

    //set Total amount of pages
    let totalPages = Math.ceil(productsByCategory.length / props.productsPerPage);
    let currentPage = props.currentPage;
    if (totalPages < currentPage) {
        currentPage--;
    }

    //Set Current Page
    const indexOfLastProduct = currentPage * props.productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - props.productsPerPage;
    const currentProducts = productsByCategory.slice(indexOfFirstProduct, indexOfLastProduct);

    //Returnig products to show
    const productsCards = currentProducts.map(product => {
        //Cut title if too long
        if (product.productName.length > 40) {
            product.productName = product.productName.substring(0, 40) + "...";
        }
        //Cut description if too long
        if (product.productDescription.length > 160) {
            product.productDescription = product.productDescription.substring(0, 160) + "...";
        }

        //return products
        return (
            <div key={product.productCode} className={styleClasses.productStyle}>
                <div className={styleClasses.nameStyle}>
                    <span
                        className={styleClasses.edit}
                        onClick={() => editProductHandler(product.productCode, product.productName, product.productDescription, product.productLine, product.buyPrice)}>Edit</span>
                    <p>{product.productName}</p>
                    <span className={styleClasses.close} onClick={() => deleteProduct(product.productCode)}>&times;</span>
                </div>
                <div className={styleClasses.descriptionStyle}><p>{product.productDescription}</p></div>
                <div className={styleClasses.priceStyle}>Price: {product.buyPrice} EUR</div>
            </div>
        );
    });
    return (
        <div>
            {editProduct ? <UpdateProduct
                fetchDataFromDB={props.fetchDataFromDB}
                closeWindowEditProduct={closeWindowEditProduct}
                productCode={productCode}
                productName={productName}
                productDescription={productDescription}
                productLine={productLine}
                buyPrice={buyPrice} /> : null}
            {productsCards}
            <Pagination paginate={props.paginate} currentPage={currentPage} totalPages={totalPages} />
        </div>
    )
}
