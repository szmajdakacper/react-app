import React from 'react';
import styleClasses from './Nav.module.css';

export default function Nav(props) {
    const buttons = (
        <ol>
            <li><button key='mainButton' className={styleClasses.mainButton}>Categories</button>
                <ul>
                    {props.categories.map(category => (
                        <li key={category}>
                            <button onClick={() => props.changedCategory(category)} className={styleClasses.buttons}>{category}</button>
                        </li>
                    ))}
                </ul>
            </li>
            <li><button onClick={props.addNewProductHandler} key='mainButton' className={styleClasses.mainButton}>Add New Product</button></li>
        </ol>
    );
    return (
        <div className={styleClasses.Nav}>
            <div className={styleClasses.buttonsContainer}>
                {buttons}
            </div>
        </div>
    )
}

