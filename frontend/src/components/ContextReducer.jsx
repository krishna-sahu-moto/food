import React, { createContext, useContext, useReducer } from 'react'
const CartStateContext = createContext();
const CartDispatcherContext = createContext();
const CartContext = createContext();


// const reducer =(state,action)=>{
// switch(action.type){
//     case 'ADD':
//         return[...state,{id:action.id,Name:action.Name,price:action.price,qty:action.qty,size:action.size}]
   
//     case'REMOVE':
//     let newArr =[...state]
//     newArr.splice(action.index,1)
//     return newArr;

//     case 'UPDATE':
//         let arr =[...state]
//         arr.find((food,index)=>{
//             if(food.id === action.id){
//                 console.log(food.qty,parseInt(action.qty),action.price + food.price)
//                 arr[index] = {...food,qty:parseInt(action.qty) + food.qty, price:action.price + food.price}
//             }
//             return arr
//         })
    
//         default:
//             console.log("Error in Reducer");
            
// }
// }

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [
                ...state,
                {
                    id: action.id,
                    Name: action.Name,
                    // img:action.img,
                    price: action.price,
                    qty: action.qty,
                    size: action.size
                }
            ];

        case 'REMOVE':
            let newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;

        case 'UPDATE':
            return state.map((food) => {
                if (food.id === action.id) {
                    return {
                        ...food,
                        qty: parseInt(action.qty) + parseInt(food.qty),
                        price: action.price + food.price
                    };
                }
                return food;
            });
        case 'DROP':
            let empArray = []
            console.log("DROP SECTION")
             return empArray

        default:
            console.log("Error in Reducer");
            return state; // Always return the state in default case
    }
};

export const CartProvider = ({children}) =>{
   
   const[state,dispatch]=useReducer(reducer,[])
    return(
<CartDispatcherContext.Provider value={dispatch}>
    <CartStateContext.Provider value={state}>
        {children}
    </CartStateContext.Provider>

</CartDispatcherContext.Provider>
    )
}
// export default CartProvider;
export const useCart = () => useContext(CartStateContext);

export const useDispatchCart = () => useContext(CartDispatcherContext);
export default CartContext;