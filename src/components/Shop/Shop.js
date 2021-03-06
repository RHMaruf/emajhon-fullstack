import React, { useEffect, useState } from 'react';
import './shop.css';
import Product from '../Product/Product';
import Cart from '../cart/Cart';
import { Link } from 'react-router-dom';

import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
const Shop = () => {
    //const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('http://localhost:5000/productsByKeys',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(productKeys) 
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, []);
    const handleAddProduct = (product) => {

        const sameProduct = cart.find(pd => pd.key === product.key)
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key)
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);

        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={pd}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="add-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>

    );
};

export default Shop;  