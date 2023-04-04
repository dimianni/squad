import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Search() {

    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('')
    const [error, setError] = useState(false)
    const [touched, setTouched] = useState(false)

    const handleEnter = (e) => {
        if (e.key === 'Enter' && searchTerm !== ''){
            router.push(`/search?term=${searchTerm}`);
        }
    }

    const handleSearch = (e) => setSearchTerm(e.target.value);
    const handleClick = (e) => {
        if (searchTerm === ''){
            e.preventDefault();
            setError(true)
        }
    }
    const handleBlur = () => setTouched(true);
    

    useEffect(() => {
        if (searchTerm.length < 2 && touched){
            setError(true)
        } else {
            setError(false)
        }
    }, [searchTerm, touched])


    return (
        <div className="my-6 flex justify-center items-center">
            <input
                className={`bg-wite border border-grey p-2 pl-4 rounded-xl text-base ${error ? "error" : ""}`}
                type="text"
                value={searchTerm}
                placeholder="Search clubs"
                onChange={handleSearch}
                onKeyPress={handleEnter}
                onBlur={handleBlur}
            />
            <button className="ml-2">
                <Link onClick={handleClick} href={`/search?term=${searchTerm}`}>Search</Link>
            </button>
        </div>
    )
}