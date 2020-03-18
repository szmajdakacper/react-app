import React from 'react'
import styleClasses from './FormProduct.module.css';

export default function FormProduct(props) {
    return (
        <div>
            <div className={styleClasses.FormClass}>
                <div className={styleClasses.layer} onClick={props.closeWindow}></div>
                <div className={styleClasses.formLayer} >
                    <div className={styleClasses.closeButton} onClick={props.closeWindow}><span>&times;</span></div>

                    <h1>{props.title}</h1>
                    <form onSubmit={props.submitted} className={styleClasses.form}>
                        <div className={styleClasses.inputElement}>
                            {props.updating ?
                                <div>
                                    <label htmlFor='productCode'>Unique Product Code:</label>
                                    <div>{props.productCode}</div>
                                </div>
                                :
                                <div>
                                    <label htmlFor='productCode'>Unique Product Code:</label>
                                    <input onChange={(event) => props.onChange(event)} name='productCode' type='text' />
                                </div>}

                        </div>
                        <div className={styleClasses.inputElement}>
                            <label htmlFor='productName'>Product Name:</label>
                            {props.updating ?
                                <input onChange={(event) => props.onChange(event)} name='productName' type='text' value={props.productName} /> :
                                <input onChange={(event) => props.onChange(event)} name='productName' type='text' />}

                        </div>
                        <div className={styleClasses.inputElement}>
                            {props.updating ?
                                <textarea onChange={(event) => props.onChange(event)} name='productDescription' placeholder='Product Description:' value={props.productDescription}></textarea> :
                                <textarea onChange={(event) => props.onChange(event)} name='productDescription' placeholder='Product Description:'></textarea>}
                        </div>
                        <div className={styleClasses.inputElement}>
                            <label htmlFor='productLine'>Category:</label>
                            {props.updating ?
                                <input onChange={(event) => props.onChange(event)} name='productLine' type='text' value={props.productLine} /> :
                                <input onChange={(event) => props.onChange(event)} name='productLine' type='text' />}
                        </div>
                        <div className={styleClasses.inputElement}>
                            <label htmlFor='price'>Price:</label>
                            {props.updating ?
                                <input onChange={(event) => props.onChange(event)} name='buyPrice' type='text' value={props.buyPrice} /> :
                                <input onChange={(event) => props.onChange(event)} name='buyPrice' type='text' />}
                        </div>
                        <div className={styleClasses.inputSubmit}>
                            <input type='submit' value={props.submitButton} />
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}
