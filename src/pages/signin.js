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
            try {
                setError('')
                setLoading(true)
                console.log(typeof (signin(user, pwd))); //object

                let theUser = await signin(user, pwd)
                console.log(theUser);
                setError('User success log in')

                router.push(`/profile/${theUser.user.uid}`)
            } catch (error) {
                setError('Failed to log in')
                console.log(error);
            }
        }
        setLoading(false)
    }

    return (
        <main className="mt-16">
            <div className="wrapper w-96 mx-auto flex flex-col justify-center items-center">
                <h1 className="text-3xl font-semibold mb-6">Sign In</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center">
                    <input onChange={handleUserInput} value={user} placeholder="Your username" className="w-full bg-wite border mb-4 border-grey p-2 pl-4 rounded-xl text-base" type="text" />
                    <input onChange={handlePwdInput} value={pwd} placeholder="Your password" className="w-full bg-wite border mb-4 border-grey p-2 pl-4 rounded-xl text-base" type="text" />
                    <Button btnType="submit" btnText="Sign In" disabled={loading} />
                </form>
                <div className="mt-4 text-sm flex">
                    <p className="mr-1">Need an account?</p>
                    <Link className="underline" href="/signup">Sign Up</Link>
                </div>

                {error && <div>{error}</div>}
            </div>
        </main>
    )
}