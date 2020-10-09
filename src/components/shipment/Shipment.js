import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import "./shipment.css";
const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  console.log(watch("example")); // watch input value by passing the name of it

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