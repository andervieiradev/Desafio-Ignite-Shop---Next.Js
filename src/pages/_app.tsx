import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import { Container, Header } from "../styles/pages/app"


import Image from "next/future/image"
import logoImg from '../assets/logo.svg'
import Link from "next/link"
import { Handbag } from "phosphor-react"
import { CartContext, CartContextProvider } from "../contexts/CartContext"
import { useContext } from "react"
import { CartIcon } from "../components/CartIcon"

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  const { cartQuantity } = useContext(CartContext)

  return (
    <CartContextProvider>
      <Container>
        <Header>
          <Link href={`/`} >
            <Image src={logoImg} alt="" />
          </Link>

          <CartIcon />
        </Header>

        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  )
}
