import Videos from "@/components/Videos";

export default function Page(){
    return(
        <>
            <header>
                <h1 className='mb-2'>Videos</h1>
                <p>Welcome to our video library. Find resources for your next projects.</p>
            </header>
            <Videos />
        </>
        
    )
}