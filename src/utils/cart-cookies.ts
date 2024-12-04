import type { CartItem } from "@/interfaces"
import Cookies from "js-cookie"

export class CartCoookiesClient {

    static getCart():CartItem[] {

        const cart = JSON.parse(Cookies.get('cart') || '[]');

        return cart
    }
    static addItem(cartItem:CartItem):CartItem[]  {

        const cart = CartCoookiesClient.getCart();

        const existCartItem =cart.find(item => item.id === cartItem.id && item.size === cartItem.size);
        
        if(existCartItem){
            existCartItem.quantity += cartItem.quantity;
        }else{
            cart.push(cartItem);
        }
        Cookies.set('cart', JSON.stringify(cart));

        return cart
    }
    static removeItem( productId:string, size:string):CartItem[]  {

        const cart = CartCoookiesClient.getCart();

        const updatedCart = cart.filter(item => !(item.id === productId && item.size === size));
        

        Cookies.set('cart', JSON.stringify(updatedCart));


        return updatedCart;
    }
}