import { Handbag, X } from "phosphor-react";
import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";

import * as Dialog from '@radix-ui/react-dialog';
import { ButtonFinishCheckout, CartIconContainer, CartItem, CartItemDescription, CartItemResume, CartItensContainerModal, DialogClose, DialogContent, DialogOverlay, DialogTitle, ImageContainer } from "../styles/components/CartIcon";
import Image from "next/future/image";

export function CartIcon() {
  const {
    totalAmount,
    openModal,
    cart,
    cartQuantity,
    handleRemoveItemsToCart,
    handleChangeOpenModal,
    isCreatingCheckoutSession,
    handleBuyProduct
  } = useContext(CartContext)


  const btnDisabled = (cartQuantity === 0)

  return (

    <Dialog.Root open={openModal} onOpenChange={(open) => handleChangeOpenModal(open)}>
      <Dialog.Trigger asChild>
        <CartIconContainer disabled={btnDisabled}>
          <Handbag size={22} weight="bold" />
          {cartQuantity > 0 && <span>{cartQuantity}</span>}
        </CartIconContainer>
      </Dialog.Trigger>

      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent >
          <DialogClose>
            <X size={24} fill='bold' />
          </DialogClose>

          <DialogTitle>
            Sacola de compras
          </DialogTitle>

          <CartItensContainerModal>
            {cart.map((cart) => {
              return (
                <CartItem key={cart.id}>
                  <ImageContainer>
                    <Image src={cart.imageUrl} width={90} height={90} alt='' />
                  </ImageContainer>

                  <CartItemDescription>
                    <span>{cart.name}</span>
                    <strong>{new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(cart.price / 100)}</strong>

                    <div
                      className="removeBtn"
                      onClick={() => handleRemoveItemsToCart(cart.id)}
                    >
                      Remover
                    </div>
                  </CartItemDescription>
                </CartItem>
              )
            })}


            <CartItemResume>
              <div>
                <span>Quantidade</span>
                <span className="totaItems">{cartQuantity} itens</span>
              </div>
              <div>
                <strong>Valor total</strong>
                <strong className="totalAmount">{new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(totalAmount / 100)}</strong>
              </div>

              <ButtonFinishCheckout
                disabled={isCreatingCheckoutSession}
                onClick={handleBuyProduct}
              >Finalizar Compra</ButtonFinishCheckout>
            </CartItemResume>



          </CartItensContainerModal>

        </DialogContent>
      </Dialog.Portal>


    </Dialog.Root >
  )
}