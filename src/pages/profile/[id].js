import { useAuth } from "@/contexts/AuthContext"


export default function Profile(){

    const { currentUser } = useAuth();

    return (
        <main className="mt-24">
            <h1>User profile</h1>
            <p>{currentUser?.email}</p>
        </main>
    )
}