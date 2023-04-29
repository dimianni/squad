import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/UI"

export default function LoginForm() {

    const router = useRouter()
    const { signin, signup } = useAuth()
    const [formType, setFormType] = useState("Sign in")

    // Form Fields
    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')

    // Statuses
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // Handlers
    const handleUserInput = (e) => setUser(e.target.value);
    const handlePwdInput = (e) => setPwd(e.target.value);
    const handleConfirmPwdInput = (e) => setConfirmPwd(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formType === "Sign in") {

            if (user !== '' && pwd !== '') {
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

        } else {
            if (user !== '' && pwd !== '' && confirmPwd !== '') {
                if (pwd === confirmPwd){
                    try {
                        setError('')
                        setLoading(true)
                        let createdUser = await signup(user, pwd)
                        router.push(`/profile/${createdUser.user.uid}`)
                    } catch (error) {
                        setError('Failed to create an account')
                        console.log(error);
                    }
                } else {
                    setError('Passwords do not match!')
                }
            }
            setLoading(false)
        }
    }

    // Cleanup on formType change
    useEffect(() => {
        setUser('')
        setPwd('')
        setConfirmPwd('')
        setError('')
    }, [formType])
    

    return (
        <div className="wrapper w-96 mx-auto flex flex-col justify-center items-center">
            <h1 className="text-3xl font-semibold mb-6">{formType}</h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col justify-center items-center">
                <input onChange={handleUserInput} value={user} placeholder="Your username" className="w-full bg-wite border mb-4 border-grey p-2 pl-4 rounded-xl text-base" type="text" />
                <input onChange={handlePwdInput} value={pwd} placeholder="Your password" className="w-full bg-wite border mb-4 border-grey p-2 pl-4 rounded-xl text-base" type="text" />
                
                { formType === "Sign up" &&
                    <input onChange={handleConfirmPwdInput} value={confirmPwd} placeholder="Confirm password" className="w-full bg-wite border mb-4 border-grey p-2 pl-4 rounded-xl text-base" type="text" />
                }
                <Button btnType="submit" btnText={formType} disabled={loading} />
            </form>

            {
                formType === "Sign in" ? (
                    <div className="mt-4 text-sm flex">
                        <p className="mr-1">Need an account?</p>
                        <button className="underline" onClick={() => setFormType("Sign up")}>Sign Up</button>
                    </div>
                ) : (
                    <div className="mt-4 text-sm flex">
                        <p className="mr-1">Already have an account?</p>
                        <button className="underline" onClick={() => setFormType("Sign in")}>Sign in</button>
                    </div>
                )
            }

            {error && <div>{error}</div>}
        </div>
    )
}