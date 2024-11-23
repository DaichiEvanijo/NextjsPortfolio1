import { useState } from "react"
import toast from "react-hot-toast"


const useImagePreview = () => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const handleFileChange= (index:number, e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    if(e.target.files && e.target.files.length){
      const file = e.target.files[0] 
      if (file.size > 800000) {
        toast.error("the size of your image must be less than 800KB")
        return 
      }
      const url = URL.createObjectURL(file)
      setPreviewUrls(prev => {
        const newUrls = [...prev]
        newUrls[index] = url
        return newUrls
      })
    }else{
      setPreviewUrls(prev => {
        const newUrls = [...prev]
        newUrls[index] = ""
        return newUrls
      })
    }
  }

  return {previewUrls, handleFileChange}
}

export default useImagePreview