// // import React from 'react'
// // import Footer from '../footer'
// import Navbar from '../Navbar'


// export default function MyOrder() {
//     const [orderData,setOrderData]= useState(null);
//     // const [orderData, setorderData] = useState({})
// console.log("anil1");
//     const fetchMyOrder = async () => {
//         console.log(localStorage.getItem('userEmail'))
//         await fetch("http://localhost:5000/myOrderData", {
//             // credentials: 'include',
//             // Origin:"http://localhost:5173/login",
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body:JSON.stringify({
//                 email:localStorage.getItem('userEmail')
//             })
//         }).then(async (res) => {
//             let response = await res.json()
//             await setOrderData(response)
//         })



//         // await res.map((fetched_data)=>{
//         //    console.log(fetched_data)
//         // })


//     }

//     useEffect(() => {
//         fetchMyOrder()
//     }, [])

//     return (
//     <>
    
//     <div>
//         <Navbar />
//     </div>

//     <div className='container'>
//         <div className='row'>

//             {/* {orderData !== {} ? Array(orderData).map(fetched_data => {
//                 return (
//                     fetched_data.orderData ?
//                         fetched_data.orderData.order_data.slice(0).reverse().map((item) => {
//                             return (
//                                 item.map((arrayData) => {
//                                     return (
//                                         <div  >
//                                             {arrayData.Order_date ? <div className='m-auto mt-5'>

//                                                 {fetched_data = arrayData.Order_date}
//                                                 <hr />
//                                             </div>  */}
//                                              {orderData && orderData.orderData ? (
//                         orderData.orderData.order_data.slice(0).reverse().map((item, index) => (
//                             item.map((arrayData, subIndex) => (
//                                 <div key={`${index}-${subIndex}`}>
//                                     {arrayData.Order_date ? (
//                                         <div className="m-auto mt-5">
//                                             <strong>Order Date: {arrayData.Order_date}</strong>
//                                             <hr />
//                                         </div>:

//                                                 <div className='col-12 col-md-6 col-lg-3' >
//                                                     <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
//                                                         <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
//                                                         <div className="card-body">
//                                                             <h5 className="card-title">{arrayData.name}</h5>
//                                                             <div className='container w-100 p-0' style={{ height: "38px" }}>
//                                                                 <span className='m-1'>{arrayData.qty}</span>
//                                                                 <span className='m-1'>{arrayData.size}</span>
//                                                                 <span className='m-1'>{fetched_data}</span>
//                                                                 <div className=' d-inline ms-2 h-100 w-20 fs-5' >
//                                                                     ₹{arrayData.price}/-
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>

//                                                 </div>



//                                             }

//                                         </div>
//                                     )
//                                 })

//                             )
//                         }) : ""
//                 )
//             }) : ""}
//         </div>


//     </div>
//     <div>
//     {/* <Footer /> */}
// </div>
// </> )
    

// }

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        fetchMyOrder();
    }, []);
    
    const fetchMyOrder = async () => {
        const email = localStorage.getItem('userEmail');
        console.log(email);
        try {
            const res = await fetch("http://localhost:5000/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
    
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
    
            const response = await res.json();
            console.log('Fetched order data:', response);  // Log to inspect the structure
            setOrderData(response);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };
    
    return (
        <>
            <div>
                <Navbar />
            </div>
    
            <div className="container">
                <div className="row">
                    {orderData && orderData.orderData ? (
                        orderData.orderData.order_data.slice(0).reverse().map((item, index) => (
                            Array.isArray(item) ? item.map((arrayData, subIndex) => {
                                const fetched_data = arrayData;  // Assign arrayData to fetched_data
    
                                return (
                                    <div key={`${index}-${subIndex}`}>
                                        {fetched_data.Order_date ? (
                                            <div className="m-auto mt-5">
                                                <strong>Order Date: {fetched_data.Order_date}</strong>
                                                <hr />
                                            </div>
                                        ) : (
                                            <div className="col-12 col-md-6 col-lg-3">
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    <img src={fetched_data.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{fetched_data.name}</h5>
                                                        <div className="container w-100 p-0" style={{ height: "38px" }}>
                                                            <span className="m-1">{fetched_data.qty}</span>
                                                            <span className="m-1">{fetched_data.size}</span>
                                                            <span className="m-1">{fetched_data.Order_date}</span>
                                                            <div className="d-inline ms-2 h-100 w-20 fs-5">
                                                                ₹{fetched_data.price}/-
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            }) : (
                                <p>No items found in this order.</p>
                            )
                        ))
                    ) : (
                        <p>No orders found</p>
                    )}
                </div>
            </div>
        </>
    );
    
}
