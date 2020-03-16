import React from 'react'
import styleClasses from './Pagination.module.css';

const Pagination = (props) => {
    const currentPage = props.currentPage;
    const beforCurrentPage = currentPage - 1;
    const afterCurrentPage = currentPage + 1;
    let moreThanSevenPages = false;
    const pageNumbers = [];
    for (let i = 1; i <= props.totalPages; i++) {
        pageNumbers.push(i);
        if (i > 7) {
            moreThanSevenPages = true;
        }
    }
    const activeClass = new Array(pageNumbers.length);
    activeClass[currentPage] = styleClasses.active;
    if (moreThanSevenPages) {
        const lastPage = pageNumbers.length;
        if (currentPage < 4) {
            return (
                <div className={styleClasses.PaginationContainer}>
                    <div className={styleClasses.Pagination}>
                        <button className={activeClass[1]} key='1' onClick={() => props.paginate(1)} >1</button>
                        <button className={activeClass[2]} key='2' onClick={() => props.paginate(2)} >2</button>
                        <button className={activeClass[3]} key='3' onClick={() => props.paginate(3)} >3</button>
                        <button className={activeClass[4]} key='4' onClick={() => props.paginate(4)} >4</button>
                        <button className={activeClass[5]} key='5' onClick={() => props.paginate(5)} >5</button>

                        <button key='dotsRight' >...</button>
                        <button className={activeClass[lastPage]} key={lastPage} onClick={() => props.paginate(lastPage)} >{lastPage}</button>
                        <button onClick={() => props.paginate(afterCurrentPage)} >&raquo;</button>
                    </div>
                </div >
            );
        } else if (currentPage > (lastPage - 4)) {
            return (
                <div className={styleClasses.PaginationContainer}>
                    <div className={styleClasses.Pagination}>
                        <button onClick={() => props.paginate(beforCurrentPage)} >&laquo;</button>
                        <button className={activeClass[1]} key='1' onClick={() => props.paginate(1)} >1</button>
                        <button key='dotsLeft' >...</button>

                        <button className={activeClass[lastPage - 5]} key={lastPage - 5} onClick={() => props.paginate(lastPage - 5)} >{lastPage - 5}</button>
                        <button className={activeClass[lastPage - 4]} key={lastPage - 4} onClick={() => props.paginate(lastPage - 4)} >{lastPage - 4}</button>
                        <button className={activeClass[lastPage - 3]} key={lastPage - 3} onClick={() => props.paginate(lastPage - 3)} >{lastPage - 3}</button>
                        <button className={activeClass[lastPage - 2]} key={lastPage - 2} onClick={() => props.paginate(lastPage - 2)} >{lastPage - 2}</button>
                        <button className={activeClass[lastPage - 1]} key={lastPage - 1} onClick={() => props.paginate(lastPage - 1)} >{lastPage - 1}</button>
                        <button className={activeClass[lastPage]} key={lastPage} onClick={() => props.paginate(lastPage)} >{lastPage}</button>
                    </div>
                </div >
            );
        }
        return (
            <div className={styleClasses.PaginationContainer}>
                <div className={styleClasses.Pagination}>
                    <button onClick={() => props.paginate(beforCurrentPage)} >&laquo;</button>
                    <button className={activeClass[1]} key='1' onClick={() => props.paginate(1)} >1</button>
                    <button key='dotsLeft' >...</button>

                    <button className={activeClass[beforCurrentPage]} key={beforCurrentPage} onClick={() => props.paginate(beforCurrentPage)} >{beforCurrentPage}</button>
                    <button className={activeClass[currentPage]} key={currentPage} onClick={() => props.paginate(currentPage)} >{currentPage}</button>
                    <button className={activeClass[afterCurrentPage]} key={afterCurrentPage} onClick={() => props.paginate(afterCurrentPage)} >{afterCurrentPage}</button>

                    <button key='dotsRight' >...</button>
                    <button className={activeClass[lastPage]} key={lastPage} onClick={() => props.paginate(lastPage)} >{lastPage}</button>
                    <button onClick={() => props.paginate(afterCurrentPage)} >&raquo;</button>
                </div>
            </div >
        );
    } else {
        return (
            <div className={styleClasses.PaginationContainer}>
                <div className={styleClasses.Pagination}>

                    {pageNumbers.map(number => (
                        <button className={activeClass[number]} key={number} onClick={() => props.paginate(number)} >{number}</button>
                    ))}

                </div>
            </div >
        );
    }
}

export default Pagination;
