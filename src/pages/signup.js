import { useRouter } from "next/router"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"
import Button from "@/UI/Button"

export default function Signin() {

    const router = useRouter()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { signup, currentUser } = useAuth()

    const handleUserInput = (e) => {
        setUser(e.target.value)
    }
    const handlePwdInput = (e) => {
        setPwd(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (user !== '' && pwd !== '') {
            console.log(user, pwd);
            try {
                setError('')
                setLoading(true)
                let createdUser = await signup(user, pwd)
                router.push(`/profile/${createdUser.user.uid}`)
            } catch (error) {
                setError('Failed to create an account')
                console.log(error);
            }
        }
        setLoading(false)
    }

    return (
        <main className="mt-16">
            <div className="wrapper w-96 mx-auto flex flex-col justify-center items-center">
                <h1 className="text-3xl font-semibold mb-6">Sign Up</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center">
                    <input onChange={handleUserInput} value={user} placeholder="Your username" className="w-full mb-4 bg-wite border border-grey p-2 pl-4 rounded-xl text-base" type="text" />
                    <input onChange={handlePwdInput} value={pwd} placeholder="Your password" className="w-full mb-4 bg-wite border border-grey p-2 pl-4 rounded-xl text-base" type="text" />
                    <Button btnType="submit" btnText="Sign Up" disabled={loading} />
                </form>
                <div className="mt-4 text-sm flex">
                    <p className="mr-1">Already have an account?</p>
                    <Link className="underline" href="/signin">Sign In</Link>
                </div>

                {error && <div>{error}</div>}
            </div>
        </main>
    )
}