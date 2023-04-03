import Image from "next/image"
import Link from "next/link"
import logo from '../../../public/images/thedreamteam_logo.svg'


export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full h-16 bg-white py-3">
            <div className="container flex justify-center items-center">
                <h1 className="text-white text-xl font-bold w-52">
                    <Link className="w-full" href="/">
                        <Image src={logo} alt="TheDreamteam" style={{width: "100%", height: "auto"}} />
                    </Link>
                </h1>
            </div>
        </header>
    )
}