"use client"

import { ProductType} from '@/lib/types/ProductType'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'



type ProductFilterType = {
  products:ProductType[]
  category?:string,
  search?:string,
}
const ProductFilter = ({products,category,search}:ProductFilterType) => {
  const router = useRouter()


  const uniqueArray = [...new Set(products.map(product => product.category))];

  const [selectedCategory, setSelectedCategory] = useState(category)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
    router.push(`/productslist?category=${e.target.value}&search=${search}`);
  };

  
  
  return (
    <div className="flex flex-col items-start gap-1 w-32">
      <label htmlFor="countries">Country</label>
      <select name="countries" id="countries" value={selectedCategory} onChange={handleChange} className="border border-gray-300 rounded-lg hover:border-[rgb(30,144,255)] w-full p-1 text-xs sm:text-sm">
        <option value="undefined" >All countries</option>
        {uniqueArray.map((category, key) => (
          <option value={category} key={key}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ProductFilter