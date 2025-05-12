import React from 'react'
import { useParams } from 'react-router'

function ProductsDetail() {
    const {productsId} =useParams();
  return (
    <div>ProductsDetail</div>
  )
}

export default ProductsDetail