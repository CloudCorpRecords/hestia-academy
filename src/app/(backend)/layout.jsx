import { SignedIn } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Navbar from '@/components/Navbar';

export default async function Layout({children}) {

  const user = await currentUser();
  const userData = {
    id: user.id,
    imageUrl: user.imageUrl,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    primaryEmailAddress: {
      emailAddress: user.emailAddresses[0].emailAddress
    }
  };

  return (
    <SignedIn>
      <div className="min-h-full">
        <Navbar user={userData} />
        <main>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </SignedIn>
  )
} 