import React from 'react'
import styleClasses from './Header.module.css';

export default function Header() {
    return (
        <header className={styleClasses.Header}>
            <div className={styleClasses.Layer} ></div>
            <div className={styleClasses.Text}>Vehicle models</div>
        </header>
    )
}