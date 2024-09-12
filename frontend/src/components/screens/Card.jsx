import React from 'react'
// import Delete from '@material-ui/icons/Delete'
import { useDispatchCart, useCart } from '../ContextReducer';

import Delete from '@mui/icons-material/Delete';
// export default function Card() {
export default function Card() {

  // existing code...


  let fetched_data = useCart();
  let dispatch = useDispatchCart();

  if (!fetched_data) {

    return <div>Loading...</div>; // Handle the case when fetched_data is not yet available
  }
  if (fetched_data.length === 0) {
    console.log("Fetched data is empty, rendering empty cart message.");
    return (


      <div>

        <div className='m-5 w-100 text-center text-white fs-3'>The Cart is Empty!</div>
      </div>
    )
  }



  const handleRemove = (index)=>{
    console.log(index)
    dispatch({type:"REMOVE",index:index})
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    console.log(fetched_data, localStorage.getItem("userEmail"), new Date(), "anil")
    let response = await fetch(" https://food-backend-l0nx.onrender.com", {
     // http://localhost:5000/api/orderData
      // credentials: 'include',
      // Origin:"http://localhost:5173/login",

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: fetched_data,
        email: userEmail,
        order_date: new Date().toLocaleString()
      })
    });
    // console.log("JSON RESPONSE:::::", response.status);
    console.log("Order Response:", response);
    // if (response.status === 200) {
    //   dispatch({ type: "DROP" })
    // }
    if (response.ok) {
      dispatch({ type: "DROP" });
    } else {
      console.error("Checkout failed:", response);
    }


  }

//   const handleCheckOut = async () => {
//     let userEmail = localStorage.getItem("userEmail");

//     if (!userEmail) {
//         console.error("No user email found in localStorage.");
//         return;
//     }

//     try {
//         let response = await fetch("http://localhost:5000/api/orderData", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 order_data: fetched_data,
//                 email: userEmail,
//                 order_date: new Date().toDateString()
//             })
//         });

//         if (response.ok) {
//             dispatch({ type: "DROP" });
//         } else {
//             const errorBody = await response.text(); // Read the error response body
//             console.error("Checkout failed:", response.status, response.statusText, errorBody);
//         }
//     } catch (error) {
//         console.error("Order submission error:", error);
//     }
// };



  let totalPrice = fetched_data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(fetched_data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success text-green  fs-4'>
            <tr>
              <th scope='col ' >#</th>
              <th scope='col ' >img</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {fetched_data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.img}</td>
                <td >{food.Name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0 btn-danger"><Delete alt='delete' width="24" height="24" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn btn-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
          {/* onClick={handleCheckOut} */}
        </div>
      </div>



    </div>
  )
}
