import React, { useState, useEffect } from 'react';
import styleClasses from './App.module.css';
import axios from 'axios';
import Header from './Header/Header';
import Nav from './Nav/Nav';
import Products from './Products/Products';
import NewProduct from './Products/AddOrUpdateProduct/NewProduct';
import Footer from './Footer/Footer';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [category, setCategory] = useState('all');
  const [updateData, setUpdateData] = useState(false);
  const [addNewProduct, setAddNewProduct] = useState(false);

  //Fetch data from Database
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await axios.get("https://myapi.szmajdakacper.eu/products/api");
      setProducts(res.data);
      setLoading(false);
    }

    setUpdateData(false);

    fetchProducts();
  }, [updateData]);

  //Define Categories
  const categories = ['all'];
  products.forEach(function (product) {
    categories.push(product.productLine);
  });
  let uniqueCategories = categories.filter((item, i, ar) => ar.indexOf(item) === i);

  //Check if is enough (> 0) products in category to show
  const numberOfProducts = products.filter(product => {
    return product.productLine === category;
  });
  if (numberOfProducts < 1 && category !== 'all') {
    setCategory('all');
    setCurrentPage(1);
  }

  //Changed page
  const paginateHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  //Display only products in chosen category
  const changedCategoryHandler = (category) => {
    setCategory(category);
    setCurrentPage(1);
  }

  // BUTTONS:
  // Clicked button: add new product
  const addNewProductHandler = () => {
    document.documentElement.scrollTop = 0;
    setAddNewProduct(true);
  }
  // Closed window: New Product
  const closeWindowNewProduct = () => {
    setAddNewProduct(false);
  }

  // Update data from DB
  const fetchDataFromDB = () => {
    setUpdateData(true);
  }

  return (
    <div className={styleClasses.App}>
      <Header />
      <Nav changedCategory={changedCategoryHandler} categories={uniqueCategories} addNewProductHandler={addNewProductHandler} />
      <Products
        products={products}
        category={category}
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        loading={loading}
        fetchDataFromDB={fetchDataFromDB}
        paginate={paginateHandler} />
      {addNewProduct ? <NewProduct closeWindowNewProduct={closeWindowNewProduct} fetchDataFromDB={fetchDataFromDB} /> : null}
      <Footer />
    </div>
  );
}

export default App;
