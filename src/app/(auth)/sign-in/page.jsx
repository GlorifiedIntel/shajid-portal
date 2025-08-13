// src/app/auth/sign-in/page.jsx
import { Suspense } from 'react';
import SignInClient from './SignInClient';
import Navbar from '@/components/Navbar';

export default function SignInPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<p>Loading...</p>}>
        <SignInClient />
      </Suspense>
    </>
  );
}