import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { Header } from '@/components/layout/Header';

async function getUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');

    if (!token) return null;

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token.value, secret);

    return {
      email: payload.email as string,
      name: payload.name as string | undefined,
      role: payload.role as string,
    };
  } catch (error) {
    return null;
  }
}

import DashboardLayout from '@/components/layout/DashboardLayout';

// ... (imports remain the same)

export default async function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <DashboardLayout user={user || undefined}>
      {children}
    </DashboardLayout>
  );
}
