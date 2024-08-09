import React from 'react';
import CheckoutForm from '../../../components/CheckoutForm';
import { currentUser } from "@clerk/nextjs/server";

export default async function Dashboard() {
  const user = await currentUser()
  if (!user) {
    return null;
  }
console.log(user)
  return (
    <>
      <header>
        <h1 className='mb-2'>Dashboard</h1>
        <p>Welcome to your dashboard. Here you can find various resources to help you on your coding journey.</p>
      </header>
      {user.publicMetadata.premium === 'yes' ? (
        <div className=''>
          Premium User
        </div>
      ) : (
        <div className='max-w-5xl mx-auto px-4 py-2 bg-[#f2f2f2] mt-16'>
          <h2 className='text-center'>Get access to all of our Premium Content!</h2>
          <p>Unlock your potential with our exclusive premium content! Join our online academy and master the art of launching no-code apps. Gain insider tips, expert guidance, and practical tools to bring your ideas to life—no coding required. Start your journey to becoming a no-code app builder today!</p>
          <CheckoutForm />
        </div>
      )}
      
    </>
  );
}
