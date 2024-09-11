import React, { useEffect, useRef } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import img3 from './CarouselImage/img3.jpeg'
import { useDispatchCart, useCart } from './ContextReducer';
import { useState } from 'react';




export default function Cart(props) {
    let dispatch = useDispatchCart();
    let fetched_data = useCart();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const priceRef = useRef();
    // let foodItem = props.foodItems;
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    
    
    // const handleAddToCart = async () => {
    //     let food = []
    //     for (const item of fetched_data) {
    //         if (item.id === props.foodItem._id) {
    //             food = item;
    //             break;
    //         }
    //     }

    //     if (food > []) {
    //     // if(food !== []){
    //         if (food.size === size) {
    //             await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
    //             return
    //         }

    //         else if (food.size !== size) {
    //             await
    //                 dispatch({
    //                     type: "ADD",
    //                     id: props.foodItem._id,
    //                     Name: props.foodItem.Name,
    //                     price: finalPrice,
    //                     qty: qty,
    //                     size: size
    //                 });
    //             return
    //             // await console.log(fetched_data);
    //         }
    //         return

    //     }
    //     await
    //         dispatch({
    //             type: "ADD",
    //             id: props.foodItem._id,
    //             Name: props.foodItem.Name,
    //             price: finalPrice,
    //             qty: qty,
    //             size: size
    //         });
    //             await console.log(fetched_data);

        
    // };


    const handleAddToCart = async () => {
        let food = null; // Initialize food to null
    
        // Find the item in fetched_data that matches the current food item ID
        for (const item of fetched_data) {
            if (item.id === props.foodItem._id) {
                food = item; // Assign the matching item to food
                break;
            }
        }
    
        console.log("Fetched data item found:", food); // Debugging output
    
        if (food) { // Check if food is not null
            console.log("Item exists in cart:", food);
    
            if (food.size === size) {
                console.log("Item size matches. Updating item in cart.");
                await dispatch({
                    type: "UPDATE",
                    id: props.foodItem._id,
                    price: finalPrice,
                    qty: qty
                });
            } else {
                console.log("Item size does not match. Adding new item to cart.");
                await dispatch({
                    type: "ADD",
                    id: props.foodItem._id,
                    Name: props.foodItem.Name,
                    price: finalPrice,
                    qty: qty,
                    size: size
                });
            }
        } else {
            // If no matching food item is found, add a new one to the cart
            console.log("Item not found in cart. Adding new item.");
            await dispatch({
                type: "ADD",
                id: props.foodItem._id,
                // img:props.foodItem.img,
                Name: props.foodItem.Name,
                price: finalPrice,
                qty: qty,
                size: size
            });
        }
    
        console.log("Fetched data after operation:", fetched_data); // Debugging output
    };
    
    
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div className='moving-border-card 'style={{margin:"0rem 0rem 1rem 0rem"}} >

            <div className="card mb-3  " style={{ width: "18.5rem", maxHeight: "500px" , border: "2px  #ccc",borderRadius: "10px",padding:"0px 0px 0px 0px"}}>
                <img src={props.foodItem.img} className="card-img-top" alt="loding" style={{ height: "200px", objectFit: "fill" }} />
                {/* <img src={props.foodItem.img} className="card-img-top" alt="loding" style={{height:"300px",objectFit:"fill"}} /> */}
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.Name}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div className="container w-100">
                        <select className='m-2 h-100  bg-success rounded' onChange={(e) => setQty(e.target.value)} >

                            {Array.from(Array(6), (e, i) => {
                                return (<option key={i + 1} value={i + 1}>{i + 1} </option>)
                            })}

                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)} >

                            {/* <option value='full'>Full</option>
                            <option value='half'>Half</option> */}
                            {priceOptions.map((fetched_data) => {
                                return <option key={fetched_data} value={fetched_data}> {fetched_data}</option>
                            })}
                        </select >
                        <div className='d-inline h-100 fs-6'>₹{finalPrice}/-</div>
                        <hr>
                        </hr>
                        <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
            
            



        </div>
    )
}
