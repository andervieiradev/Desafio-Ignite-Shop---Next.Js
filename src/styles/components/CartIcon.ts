import { styled } from "..";
import * as Dialog from '@radix-ui/react-dialog';

export const CartIconContainer = styled('button', {
  background: '$gray800',
  borderRadius: 6,
  padding: '0.75rem',
  position: 'relative',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  border: 0,

  color: '$white',

  span: {
    position: 'absolute',
    top: -8,
    right: -8,
    background: '$green500',
    fontSize: 14,
    fontWeight: 'bold',
    color: '$white',
    width: 24,
    height: 24,
    borderRadius: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '3px solid #121214'
  },

  '&:not(:disabled):hover': {
    background: '$green300',
    cursor: 'pointer'
  },

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed'
  }


})

export const DialogOverlay = styled(Dialog.DialogOverlay, {
  background: 'rgba(0,0,0,0.6)',
  inset: 0,
  position: 'fixed',
  color: '$white'
})

export const DialogContent = styled(Dialog.DialogContent, {
  position: "fixed",
  width: 480,
  height: '100%',
  top: 0,
  right: 0,
  background: '$gray800',
  padding: '3rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'
})

export const DialogClose = styled(Dialog.DialogClose, {
  position: "absolute",
  display: "flex",
  alignItems: 'center',
  justifyContent: 'center',
  top: '1.5rem',
  right: '1.5rem',
  background: 'transparent',
  border: 0,
  color: '$white',
  cursor: 'pointer'
})

export const DialogTitle = styled(Dialog.DialogTitle, {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: '$white',
})


export const CartItensContainerModal = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
})

export const CartItem = styled('div', {
  display: 'flex',
  gap: '1.5rem'
})



export const ImageContainer = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: 100,
  height: 90,

  img: {
    objectFit: 'cover',
  }
})

export const CartItemDescription = styled('div', {
  flex: 1,
  display: "flex",
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '0.5rem',

  span: {
    fontSize: 18,
    fontWeight: 'regular',
    color: '$gray300'
  },

  strong: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '$gray100'
  },

  '.removeBtn': {
    fontSize: 16,
    fontWeight: 'bold',
    color: '$green500',
    cursor: 'pointer',
    marginTop: '0.5rem'
  }

})

export const CartItemResume = styled('div', {
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    span: {
      fontSize: 16,
      fontWeight: 'regular',
      lineHeight: 1.3,
    },

    strong: {
      fontSize: 18,
      fontWeight: 'bold',
      lineHeight: 1.3,
    },

    '.totaItems': {
      fontSize: 18,
    },

    '.totalAmount': {
      fontWeight: 'bold',
      fontSize: 24,
    }
  }

})

export const ButtonFinishCheckout = styled('button', {
  marginTop: '2rem',
  backgroundColor: '$green500',
  border: 0,
  color: '$white',
  borderRadius: 8,
  padding: '1.25rem',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '$md',

  '&:not(:disabled):hover': {
    backgroundColor: '$green300',
  },

  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed'
  }
})