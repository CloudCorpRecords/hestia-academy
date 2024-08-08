import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/clerk-sdk-node';

export async function POST(req: NextRequest) {
  const { email, password, firstName, lastName } = await req.json();

  try {
    const newUser = await clerkClient.users.createUser({
      emailAddress: email,
      password,
      firstName,
      lastName,
      publicMetadata: {
        premium: 'no',
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: { Allow: "POST" } });
}
