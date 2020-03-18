import React from 'react'
import styleClasses from './Pagination.module.css';

const Pagination = (props) => {
    const currentPage = props.currentPage;
    const beforCurrentPage = currentPage - 1;
    const afterCurrentPage = currentPage + 1;
    let moreThanSevenPages = false;

    if (props.totalPages <= 1) {
        return '';
    }

    //Define number of pages in chosen category
    const pageNumbers = [];
    for (let i = 1; i <= props.totalPages; i++) {
        pageNumbers.push(i);
        if (i > 7) {
            moreThanSevenPages = true;
        }
    }

    // Set active class for current page
    const activeClass = new Array(pageNumbers.length);
    activeClass[currentPage] = styleClasses.active;

    // Pagination has four diffrent looks:
    // a) is more pages than 7:
    // 1. current page is lesser than 4
    // 2. current page is one of lasts page (current page is > lastPage - 4)
    // 3. current page is bigger than 4 and smaller than (lastPage - 4)
    // b) 
    // 4. if is less than 7 pages
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
