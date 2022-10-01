import axios from "axios";
import { createContext, ReactNode, useState } from "react";

export interface Cart {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}

interface CartContextType {
  totalAmount: number,
  openModal: boolean,
  isCreatingCheckoutSession: boolean,
  cartQuantity: number,
  cart: Cart[],
  handleAddItemsToCart: (newCart: Cart) => void,
  handleRemoveItemsToCart: (id: string) => void
  handleChangeOpenModal: (open: boolean) => void
  handleBuyProduct: () => void
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<Cart[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const totalAmount = cart.reduce((acumulador, item) => {
    return acumulador + item.price
  }, 0)

  function handleChangeOpenModal(open) {
    if (cart.length > 0) {
      setOpenModal(open)
    } else {
      setOpenModal(false)
    }
  }

  function handleAddItemsToCart(newCart: Cart) {
    if (cart.map((item) => item.id).indexOf(newCart.id) < 0) {
      const newListCart = [
        ...cart,
        newCart
      ]

      setCart(newListCart)

      if (newListCart.length > 0) {
        setOpenModal(true)
      }
    }


  }

  function handleRemoveItemsToCart(id: string) {
    const newListCart = cart.filter((item) => item.id !== id)
    setCart(newListCart)

    if (newListCart.length == 0) {
      setOpenModal(false)
    }
  }

  async function handleBuyProduct() {

    //pegar os ids price da lista de carrinhos

    const ids = cart.map((cart) => cart.id)

    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        priceIds: ids
      })

      const { checkoutUrl } = response.data

      //rota externa
      window.location.href = checkoutUrl

    } catch (err) {
      setIsCreatingCheckoutSession(false);

      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <CartContext.Provider value={{
      totalAmount,
      openModal,
      isCreatingCheckoutSession,
      cartQuantity: cart.length,
      cart,
      handleAddItemsToCart,
      handleRemoveItemsToCart,
      handleChangeOpenModal,
      handleBuyProduct
    }}>
      {children}
    </CartContext.Provider>
  )
}