import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { stripe } from "../../lib/stripe"
import Stripe from "stripe"

import axios from 'axios'

import Image from "next/future/image"

import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"
import { useContext, useState } from "react"
import Head from "next/head"
import { CartContext } from "../../contexts/CartContext"

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
    priceNumber: number;
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const { handleAddItemsToCart } = useContext(CartContext)


  if (isFallback) {
    return <p>loading...</p>
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop </title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt='' />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button onClick={() => handleAddItemsToCart({
            id: product.defaultPriceId,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.priceNumber
          })}>Colocar na sacola</button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
        priceNumber: price.unit_amount
      }
    },
    revalidate: 60 * 60 * 1 //1 hora
  }
}