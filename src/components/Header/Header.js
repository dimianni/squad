import Image from "next/image"
import Link from "next/link"
import logo from '../../../public/images/thedreamteam_logo.svg'
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/router";


export default function Header() {

    const { currentUser, signout } = useAuth();
    const router = useRouter()

    async function handleLogout(){
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
                <h1 className="text-white text-xl font-bold w-52">
                    <Link className="w-full" href="/">
                        <Image src={logo} alt="TheDreamteam" style={{ width: "100%", height: "auto" }} />
                    </Link>
                </h1>
                {
                    currentUser ? (
                        <div className="flex">
                            <Link href={`/profile/${currentUser.uid}`}>Profile</Link>
                            <button className="ml-4" onClick={handleLogout}>Sign Out</button>
                        </div>
                    ) : (
                        <Link href="/signin">Sign In</Link>
                    )
                }
            </div>
        </header>
    )
}