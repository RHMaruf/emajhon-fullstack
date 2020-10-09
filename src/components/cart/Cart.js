import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    const totalPrice = cart.reduce((total, prd) => total + (prd.price * prd.quantity), 0);
    debugger;
    let shipping = 0;

    if (totalPrice > 35) {
        shipping = 0;
    } else if (totalPrice > 15) {
        shipping = 4.99;
    } else if (totalPrice > 0) {
        shipping = 12.00
    }

    const tax = totalPrice / 10;
    return (
        <div>
            <h4>Order Summery</h4>
            <p>Items Ordered : {cart.length}</p>
            <p>Product Price : {formateNumber(totalPrice)}</p>
            <p><small>Shipping Cost : {formateNumber(shipping)}</small></p>
            <p><small>Tax + VAT : {formateNumber(tax)} </small></p>
            <p>Total Price: {formateNumber(totalPrice + shipping + tax)}</p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

const formateNumber = num =>{
    return Number(num.toFixed(2));
}

export default Cart; 