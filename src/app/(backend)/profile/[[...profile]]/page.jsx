import { UserProfile } from "@clerk/nextjs";

export default function Page(){

    return(
        <>
            <header>
                <h1 className='mb-2'>Profile</h1>
                <p>Welcome to your profile. Here you can update or remove your account.</p>
            </header>
            <UserProfile />
        </>
        
    )
}