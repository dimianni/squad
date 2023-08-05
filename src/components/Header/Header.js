import Image from "next/image"
import Link from "next/link"
import logo from '../../../public/images/squad_logo.svg'
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/router";
import { Button } from "@/UI";


export default function Header() {

    const { currentUser, signout } = useAuth();
    const router = useRouter()

    async function handleLogout(e){
        e.preventDefault()
        try {
            await signout()
            router.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <header className="fixed top-0 left-0 w-full h-16 bg-white py-3">
            <div className="container flex justify-between items-center">
                <h1 className="text-white text-xl font-bold w-36">
                    <Link className="w-full" href="/">
                        <Image src={logo} alt="TheDreamteam" style={{ width: "100%", height: "auto" }} />
                    </Link>
                </h1>
                {
                    currentUser ? (
                        <div className="flex">
                            <Button color="white" onClick={() => router.push(`/profile/${currentUser.uid}`)}>Profile</Button>
                            <Button color="blue" onClick={handleLogout}>Sign Out</Button>
                        </div>
                    ) : (
                        <Button color="blue" onClick={() => router.push("/login")}>Sign In</Button>
                    )
                }
            </div>
        </header>
    )
}