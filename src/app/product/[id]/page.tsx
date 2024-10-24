import { notFound } from 'next/navigation'
import Link from 'next/link'

import Divider from '@mui/material/Divider'
import { PageContainer } from '@toolpad/core'
import { Box, CardMedia, Typography } from '@mui/material'

import { toMoney } from '@/utils'
import { Product } from '@/app/interfaces'
import { StyledCard } from './StyledCard'

export async function generateStaticParams() {
  const res = await fetch('https://fakestoreapi.com/products')
  const products = await res.json()

  return products.map((product: any) => ({
    id: product.id.toString()
  }))
}

export default async function ProductPage({
  params
}: {
  params: { id: string }
}) {
  const { id } = await params

  const res = await fetch(`https://fakestoreapi.com/products/${id}`)
  const product = (await res.json()) as Product

  if (!product) {
    notFound()
  }

  return (
    <PageContainer
      sx={{
        height: '98vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Link
        href='/'
        style={{ fontSize: '20px', color: 'black', textDecoration: 'none' }}
      >
        Voltar
      </Link>
      <StyledCard sx={{ marginTop: '24px', padding: 6, display: 'flex' }}>
        <CardMedia
          component='img'
          sx={{ height: '400px', maxWidth: '48%', objectFit: 'contain' }}
          alt={product.title}
          src={product.image}
        />
        <Divider
          flexItem
          color='black'
          orientation='vertical'
          sx={{ marginRight: '2%', marginLeft: '2%' }}
        />
        <Box sx={{ gap: '24px', display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h4' fontWeight='bold'>
            {product.title}
          </Typography>
          <Typography variant='h5'>{toMoney(product.price)}</Typography>
          <Typography variant='h6'>{product.category}</Typography>
          <Typography variant='body1'>{product.description}</Typography>
        </Box>
      </StyledCard>
    </PageContainer>
  )
}
