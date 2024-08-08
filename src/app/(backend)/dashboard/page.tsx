import React from 'react';
import Dash from "@/components/Dash"

export default function Dashboard() {
  return (
    <>
      <header>
        <h1 className='mb-2'>Dashboard</h1>
        <p>Welcome to your dashboard. Here you can find various resources to help you on your coding journey.</p>
      </header>
      <Dash />
    </>
  );
}
