import { createContext, useContext, useEffect, useState } from "react"
import APIs, { authApis, endpoints } from "./APIs"
import { MyUserContext } from "./UserContexts"
   
export const CartContext = createContext()    
       
const CartProvider = ({ children }) => {         
      
    const [itemNumbers, setItemNumbers] = useState(0)                          
    const [cart, setCart] = useState(null)     
    
        
    const user = useContext(MyUserContext)               
    const getMyCart = async () => {
        try {                        
            // if (!user) {
            //     return
            // }     
            // const authTokenApi = await authApis()   
            // const myCart = await authTokenApi.get(endpoints['my-cart'])

      
            // console.info('MY CART: ', myCart.data)
        
            // setItemNumbers(myCart.data.items_number)   
            // setCart(myCart.data)

        } catch (error) {
      
        }
    }
    useEffect(() => {

        getMyCart()   
    }, [])

    return (    
        <CartContext.Provider value={{ itemNumbers, setItemNumbers, cart, setCart }}>
            {children}
        </CartContext.Provider>  
    )   
}  
  
export default CartProvider  