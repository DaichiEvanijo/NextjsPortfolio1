"use client"
import Button from "@/components/elements/Button"
import { deleteUser } from "@/lib/actions/users/deleteUser"
import { UserType } from "@/lib/types/UserType"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"


const UserDeleteButton = ({user}:{user:UserType}) => {
  const router = useRouter()

  const clientAction =async (id:string) => {
    const confirmed = confirm("Are you sure you would like to delete this user ?");
    if(confirmed){
      const response = await deleteUser(id)
      if(response?.message){
        toast.error(response.message)
      }else{
        toast.success(`user ${user.name} was successfully deleted`)
        router.refresh()
      }
    }
  }

  return (
    <Button type="button" onClick={() => clientAction(user._id)}>Delete user</Button>   
  )
}

export default UserDeleteButton
