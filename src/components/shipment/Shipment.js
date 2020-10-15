import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import "./shipment.css";
const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    const savedCart = getDatabaseCart();
    const orderDetails = {...loggedInUser,products: savedCart , shipment : data, orderTime : new Date()};
    fetch('http://localhost:5000/addOrder',{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(orderDetails)
    })
    .then(res => res.json())
    .then(data => {
      console.log("data",data)
      if(data){
        alert("Your order placed successfully..");
        processOrder();
      }
    })
  };
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  console.log(watch("name")); // watch input value by passing the name of it

  return (

    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
      {errors.name && <span>Name is required</span>}
      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
      {errors.email && <span>Email is required</span>}
      <input name="address" ref={register({ required: true })} placeholder="Your Address" />
      {errors.address && <span>Address is required</span>}
      <input name="phone" ref={register({ required: true })} placeholder="Your Phone" />
      {errors.phone && <span>Phone is required</span>}
      <input type="submit" />
    </form>

  );
};

export default Shipment;