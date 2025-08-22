import { redirect } from 'next/navigation';

export default function RootPage() {
  // In development, redirect to Korean as default
  // In production, middleware will handle this
  redirect('/ko');
}
