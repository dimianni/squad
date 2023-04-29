import { SquareLoader } from "react-spinners"

export default function Spinner(){
    return (
        <main className="min-h-screen">
            <div className="min-h-screen flex justify-center items-center">
                <SquareLoader color="#2081e2" />
            </div>
        </main>
    )
}