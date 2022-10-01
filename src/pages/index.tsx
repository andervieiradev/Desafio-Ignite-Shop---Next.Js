import { stripe } from "../lib/stripe"
import Stripe from "stripe"

import { AddToCart, HomeContainer, Product } from "../styles/pages/home"
import { GetStaticProps } from "next"

import Image from "next/future/image"

import { useKeenSlider } from "keen-slider/react"

import "keen-slider/keen-slider.min.css"
import Link from "next/link"
import Head from "next/head"
import { Handbag } from "phosphor-react"
import { useContext } from "react"
import { CartContext } from "../contexts/CartContext"

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    priceNumber: number;
    defaultPriceId: string;
  }[]
}

export default function Home({ products }: HomeProps) {
  const [ref] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  const { handleAddItemsToCart } = useContext(CartContext)

  return (
    <>
      <Head>
        <title>Home - Ignite Shop</title>
      </Head>

      <HomeContainer ref={ref} className="keen-slider">
        {products.map(product => {
          return (
            <Link key={product.id} href={`/product/${product.id}`} prefetch={false} >
              <Product
                className="keen-slider__slide"
              >
                <Image src={product.imageUrl} width={520} height={480} alt='' />

                <footer>
                  <div className="description">
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>

                  <AddToCart onClick={() => handleAddItemsToCart({
                    id: product.defaultPriceId,
                    name: product.name,
                    imageUrl: product.imageUrl,
                    price: product.priceNumber
                  })}>
                    <Handbag size={32} fill='bold' />
                  </AddToCart>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}


// export const getServerSideProps: GetServerSideProps = async () => {
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      priceNumber: price.unit_amount,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
      defaultPriceId: price.id,

    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 //2 horas
  }
}