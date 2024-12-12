"use client"

import Input from '@/components/elements/Input'
import useDebounce from '@/hooks/useDebounce'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const ProductSearch = ({category, search}:{category?:string, search?:string}) => {
  const [searchText, setSearchText] = useState(search)
  const debouncedSearch = useDebounce(searchText, 500)
  const router = useRouter()

  useEffect(() => {
    if(!debouncedSearch){
      router.push(`/productslist?category=${category}`)
    }else{
      router.push(`/productslist?&category=${category}&search=${debouncedSearch}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[debouncedSearch, router])


  return (
    <Input  type="text" id="searchInput" labelText="Search" value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="e.g. product,country..."/>
  )
}

export default ProductSearch