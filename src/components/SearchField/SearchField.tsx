import { Button, Input } from "../../UI";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SearchField() {

    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const [touched, setTouched] = useState<boolean>(false)


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchTerm !== ''){
            router.push(`/search?term=${searchTerm}&page=1`);
        }
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (searchTerm === ''){
            e.preventDefault();
            setError(true)
        } else {
            router.push(`/search?term=${searchTerm}&page=1`)
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
            <Input
                value={searchTerm}
                placeholder="Search clubs"
                onChange={handleSearch}
                onKeyPress={handleEnter}
                onBlur={handleBlur}
                error={error}
            />
            <Button color="white" onClick={handleClick}>
                Search
            </Button>
        </div>
    )
}