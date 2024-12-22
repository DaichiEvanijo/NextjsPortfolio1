"use client"
import Input from "@/components/elements/Input"
import useDebounce from "@/hooks/useDebounce"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const PostSearch = ({search, page}:{search?:string, page:number}) => {
  const [searchText, setSearchText] = useState(search)
  const debouncedSearch = useDebounce(searchText, 500)
  const router = useRouter()

  useEffect(() => {
    if(!debouncedSearch){
      router.push(`/postslist`)
    }else{
      router.push(`/postslist?search=${debouncedSearch}&page=${page}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[debouncedSearch, router])


  return (
    <>
      <Input  type="text" id="searchInput" labelText="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="eg. author, title..."/>
    </>
  )
}

export default PostSearch