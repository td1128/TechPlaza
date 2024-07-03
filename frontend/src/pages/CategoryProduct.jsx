import React from 'react'
import { useParams } from 'react-router'

const CategoryProduct = () => {
    const params=useParams()
    // console.log(params.category_name)
  return (
    <div>
      {params.category_name}
    </div>
  )
}

export default CategoryProduct
