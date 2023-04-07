import { useRouter } from "next/router"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"

export default function Signin() {

    const router = useRouter()
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { signin, currentUser } = useAuth()

    const handleUserInput = (e) => {
        setUser(e.target.value)
    }
    const handlePwdInput = (e) => {
        setPwd(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (user !== '' && pwd !== ''){
            console.log(user, pwd);
            try {
                setError('')
                setLoading(true)
                await signin(user, pwd)
                router.push(`/profile/${currentUser.uid}`)
            } catch (error) {
                setError('Failed to log in')
                console.log(error);
            }
        }
        setLoading(false)
    }

    return (
        <main className="mt-16 flex flex-col justify-center items-center">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                <input onChange={handleUserInput} value={user} placeholder="Your username" className="bg-wite border border-grey p-2 pl-4 rounded-xl text-base" type="text" />
                <input onChange={handlePwdInput} value={pwd} placeholder="Your password" className="bg-wite border border-grey p-2 pl-4 rounded-xl text-base" type="text" />
                <button disabled={loading} type="submit">Sign in</button>
            </form>
            <div>
                <p>Need an account?</p>
                <Link href="/signup">Sign Up</Link>
            </div>

            {error && <div>{error}</div>}
        </main>
    )
}