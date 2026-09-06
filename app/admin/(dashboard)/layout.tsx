import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const auth = cookieStore.get('admin_auth');
  if (!auth || auth.value !== 'authenticated') {
    redirect('/admin/login');
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F1F0EE' }}>
      <AdminSidebar />
      <main style={{ flex: 1, marginLeft: '260px', minHeight: '100vh', overflow: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
