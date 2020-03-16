import React from 'react'
import styleClasses from './Products.module.css'

export default function Product(props) {
    if (props.loading) {
        return (
            <h1>Loading...</h1>
        );
    }
    const productsCards = props.products.map(product => {
        if (product.productName.length > 40) {
            product.productName = product.productName.substring(0, 40) + "...";
        }
        if (product.productDescription.length > 160) {
            product.productDescription = product.productDescription.substring(0, 160) + "...";
        }
        return (
            <div key={product.productCode} className={styleClasses.productStyle}>
                <div className={styleClasses.nameStyle}>
                    <p>{product.productName}</p>
                    <span onClick={() => props.delete(product.productCode)}>&times;</span>
                </div>
                <div className={styleClasses.descriptionStyle}><p>{product.productDescription}</p></div>
                <div className={styleClasses.priceStyle}>Price: {product.buyPrice} EUR</div>
            </div>
        );
    });
    return (
        <div>{productsCards}</div>
    )
}
