
import Button from 'react-bootstrap/Button';


import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
// import CarouselPage from './CarouselPage';
import Cart from './Cart';

// import React from 'react'
import img1 from './CarouselImage/img1.jpeg';
import img2 from './CarouselImage/img2.jpeg';
import img3 from './CarouselImage/img3.jpeg';
// import SearchBar from './SearchBar';
import Carousel from 'react-bootstrap/Carousel';
import form from 'react-bootstrap/form';




export default function Home() {

  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    

    let response = await fetch("http://localhost:5000/api/foodData", {
      
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
      
    
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <div><div>
        
        <Carousel>
          
          <Carousel.Item>




          <img style={{ height: "500px" }} className="d-block  w-100" src={img1} alt="First-Slide" />
          <Carousel.Caption >
          <div className="d-flex justify-content-center">
        <form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={search} onChange={(e)=>{setSearch(e.target.value)}}
        />
        {/* <Button variant="outline-success ">Search</Button> */}
      </div>
      
            {/* <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>

          <img style={{ height: "500px", width: "100%" }} src={img2} alt="Second Slide" />
          <Carousel.Caption >
          <div className="d-flex justify-content-center">
        <form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={search} onChange={(e)=>{setSearch(e.target.value)}}
        />
        
        
        {/* <Button variant="outline-success ">Search</Button> */}
      </div>
            {/* <SearchBar></SearchBar> */}
            {/* <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>

          <img style={{ height: "500px", width: "100%" }} src={img3} alt="Third -Slide" />
          <Carousel.Caption  >
          <div className="d-flex justify-content-center">
        <form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={search} onChange={(e)=>{setSearch(e.target.value)}}
        />
        {/* <Button variant="outline-success ">Search</Button> */}
      </div>
            {/* <SearchBar></SearchBar> */}
            {/* <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p> */}
          </Carousel.Caption >
        </Carousel.Item>
      </Carousel>

    </div></div>
      <div className='container'>
        {
          foodCat.length > 0
            ? foodCat.map((fetched_data) => {
              return (<div className='row mb-3'>
                <div key={fetched_data._id}>
                  <div className='fs-3 m-3'>{fetched_data.CategoryName}</div> {/* Added key */}
                  <hr />
                  <div className='row '>
                  {
                    foodItem.length > 0 
                      ? foodItem.filter((item) => (item.CategoryName === fetched_data.CategoryName)  && 
                      item.Name && item.Name.toLowerCase().includes(search.toLowerCase())  )
                        .map((filterItems) => {
                          return (
                            <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                               {/* <Cart foodName ={filterItems.Name} options={filterItems.option[0]} imgSrc={filterItems.img}></Cart> Assuming 'card' is a placeholder, update as needed */}
                               <Cart foodItem = {filterItems} options={filterItems.option[0]} imgSrc={filterItems.img}></Cart> {/*Assuming 'card' is a placeholder, update as needed */}
                            </div>
                          )
                        })
                        : <div>null</div>
                      
                  }
                  </div>
                </div>
              </div>)
            })
            : <div className='col-12'>No categories available</div> 
        }
        {/* <Cart /> */}
        {/* <Cart></Cart> */}
      </div>
    </div>
  );
}














// import React, { useEffect, useState } from 'react'
// import Navbar from './Navbar'
// import "bootstrap/dist/css/bootstrap.min.css";
// import CarouselPage from './CarouselPage';
// import Cart from './Cart';
// // import { Link } from 'react-router-dom';
// // import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';







// export default function Home() {


//   const [foodCat, setFoodCat] = useState([]);
//   const [foodItem, setFoodItem] = useState([]);

//   const loadData = async () => {
//     let response = await fetch("http://localhost:5000/api/foodData", {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     response = await response.json();
//     setFoodItem(response[0]);
//     setFoodCat(response[1]);
//     // console.log(response[0], response[1]);
//   }
//   useEffect(() => {
//     loadData();
//   }, []);
 


//   return (
//     <div>

//       <Navbar></Navbar>
//       <CarouselPage></CarouselPage>
//       <div className='container'>
//         {/* {
//           foodCat !==[]
//           ? foodCat.map((fetched_data)=>{
//             return(
//             <div></div>
//           )
//           })
//           :<div>kjnjn</div>
//         } */}
//         {
//           foodCat.length > 0 // Fixed the check for an empty array
//             ? foodCat.map((fetched_data, index) => {
//               return (<div>
//                 <div key={fetched_data.id} className='fs-3 m-3'>{fetched_data.CategoryName}</div> // Added `key` to avoid warnings
//               <hr/>
//               {
//                     foodItem.length > 0 
//                       ? foodItem.filter((item) => item.CategoryName === fetched_data.CategoryName)
//                         .map((filteredItem) => {
//                           return (
//                             <div key={filteredItem._id}>
//                               <card></card> {/* Assuming 'card' is a placeholder, update as needed */}
//                             </div>
//                           )
//                         })
//                       : null
//                   }
//                  </div>     
//               )
//             })
//             : <div>No categories availablehjv</div> // More descriptive message
//         }
        
//         <Cart></Cart>
//       </div>





//     </div>
//   );
// }




