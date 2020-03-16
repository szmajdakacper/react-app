import React, { useState, useEffect } from 'react';
import styleClasses from './App.module.css';
import axios from 'axios';
import Header from './Header/Header';
import Nav from './Nav/Nav';
import Products from './Products/Products';
import Pagination from './Pagination/Pagination';
import qs from 'qs';

function App() {
  //Products from database
  const [productsOriginal, setProductsOriginal] = useState([]);
  //Products to show
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await axios.get("https://myapi.szmajdakacper.eu/products/api");
      setProductsOriginal(res.data);
      setProducts(res.data);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  //Define Categories
  const categories = ['all'];
  productsOriginal.forEach(function (product) {
    categories.push(product.productLine);
  });
  let uniqueCategories = categories.filter((item, i, ar) => ar.indexOf(item) === i);

  //Set Current Page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginateHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  //Display only products in chosen category
  const changedCategoryHandler = (category) => {
    let newProducts = [];
    const allProducts = [...productsOriginal];
    if (category !== 'all') {
      newProducts = allProducts.filter(function (product) {
        return product.productLine === category;
      });
      setProducts(newProducts);
      setCurrentPage(1);
    } else {
      setProducts(productsOriginal);
      setCurrentPage(1);
    }
  }

  //Delete Product
  const deleteProduct = (productCode) => {
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'POST';
    axios.defaults.headers.post['Access-Control-Max-Age'] = '3600';
    axios.defaults.headers.post['Access-Control-Allow-Headers'] = 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With';
    axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
    axios.defaults.headers.post['User-Agent'] = 'Console app';
    const method = { '_method': 'DELETE' };
    axios.post('https://myapi.szmajdakacper.eu/products/api/' + productCode, { data: qs.stringify(method) });
  }

  return (
    <div className={styleClasses.App}>
      <Header />
      <Nav changedCategory={changedCategoryHandler} categories={uniqueCategories} />
      <Products products={currentProducts} delete={deleteProduct} loading={loading} />
      <Pagination paginate={paginateHandler} currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

export default App;
