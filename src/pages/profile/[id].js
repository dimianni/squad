import { useAuth } from "@/contexts/AuthContext"


export default function Profile(){

    const { currentUser } = useAuth();

    console.log(currentUser);

    return (
        <main className="mt-16">
            <h1>User profile</h1>
            <p>{currentUser.email}</p>
        </main>
    )
}