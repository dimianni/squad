import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button, Input } from "@/UI"

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
                if (pwd === confirmPwd) {
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
                <div className="username mb-4">
                    <Input onChange={handleUserInput} value={user} placeholder="Your username" />
                </div>
                <div className="password mb-4">
                    <Input onChange={handlePwdInput} value={pwd} placeholder="Your password" />
                </div>

                {formType === "Sign up" &&
                    <div className="confirmPassword mb-4">
                        <Input onChange={handleConfirmPwdInput} value={confirmPwd} placeholder="Confirm password" />
                    </div>
                }
                <Button color="blue" disabled={loading}>
                    <p>{formType}</p>
                </Button>
            </form>

            {error && <div>{error}</div>}

            {
                formType === "Sign in" ? (
                    <div className="mt-4 text-sm flex">
                        <p className="mr-1">Need an account?</p>
                        <p className="underline" onClick={() => setFormType("Sign up")}>Sign Up</p>
                    </div>
                ) : (
                    <div className="mt-4 text-sm flex">
                        <p className="mr-1">Already have an account?</p>
                        <p className="underline" onClick={() => setFormType("Sign in")}>Sign in</p>
                    </div>
                )
            }
        </div>
    )
}