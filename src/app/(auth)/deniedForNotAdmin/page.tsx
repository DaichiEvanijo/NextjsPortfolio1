import Button from "@/components/elements/Button"
import Link from "next/link"

export default function DeniedForNotAdmin() {
    return (
        <section className="h-[calc(100vh-144px)] flex flex-col items-center justify-center p-5 gap-3 overflow-y-auto">
            <h2 className="text-3xl">Access Denied</h2>
            <p className=" text-center">You are not allowed to visit this page as your are not an admin.
            </p>
            <Button><Link href="/" className="">Return to Home Page</Link></Button>
        </section>
    )
}