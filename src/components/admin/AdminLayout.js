import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { useAuth } from '../../context/AuthContext';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children, title = 'Admin Dashboard' }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/admin/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-sm">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    router.replace('/admin/login');
  };

  const navItems = [
    { href: '/admin', icon: '📊', label: 'Dashboard' },
    { href: '/admin/products', icon: '📦', label: 'Products' },
    { href: '/admin/products/add', icon: '➕', label: 'Add Product' },
  ];

  return (
    <>
      <Head>
        <title>{title} — KRT Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <aside className="w-60 bg-primary-800 text-white flex flex-col shrink-0 hidden md:flex">
          {/* Logo */}
          <div className="px-5 py-5 border-b border-primary-700">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-xl">🚜</div>
              <div>
                <div className="font-bold text-sm leading-none">KRT Workshop</div>
                <div className="text-green-300 text-[10px] mt-0.5">Admin Panel</div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-3 space-y-1">
            {navItems.map(({ href, icon, label }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  router.pathname === href
                    ? 'bg-white/20 text-white'
                    : 'text-green-100 hover:bg-white/10'
                }`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-primary-700">
            <div className="text-xs text-green-300 mb-1 truncate">{user.email}</div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-300 hover:bg-red-900/30 hover:text-red-200 transition-colors"
            >
              🚪 Logout
            </button>
          </div>
        </aside>

        {/* Main area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile top bar */}
          <div className="md:hidden bg-primary-700 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🚜</span>
              <span className="font-semibold text-sm">KRT Admin</span>
            </div>
            <div className="flex items-center gap-3">
              {navItems.map(({ href, icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-lg p-1 rounded transition-colors ${
                    router.pathname === href ? 'bg-white/20' : 'hover:bg-white/10'
                  }`}
                >
                  {icon}
                </Link>
              ))}
              <button onClick={handleLogout} className="text-red-300 text-lg p-1">🚪</button>
            </div>
          </div>

          {/* Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>

      <Toaster position="top-right" />
    </>
  );
}
