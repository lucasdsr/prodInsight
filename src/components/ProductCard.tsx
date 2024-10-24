'use client'

import { ReactElement } from 'react'

import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

import { toMoney } from '@/utils'

interface IProductCard {
  id: number
  image: string
  title: string
  price: number
  category: string
}

export const ProductCard = ({
  id,
  image,
  title,
  price,
  category
}: IProductCard): ReactElement => {
  const router = useRouter()

  const formatedPrice = toMoney(price)

  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardMedia component='img' alt={title} height='140' image={image} />
      <CardContent>
        <Typography gutterBottom noWrap variant='h6'>
          {title}
        </Typography>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {category}
        </Typography>
        <Typography gutterBottom variant='body1' sx={{ marginTop: '4px' }}>
          {formatedPrice}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'end' }}>
        <Button size='small' onClick={() => router.push(`/product/${id}`)}>
          Mais detalhes
        </Button>
      </CardActions>
    </Card>
  )
}
