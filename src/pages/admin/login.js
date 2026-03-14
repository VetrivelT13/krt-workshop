import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../../context/AuthContext';
import { useLang } from '../../context/LanguageContext';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const { t } = useLang();
  const { user, loading, login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.replace('/admin');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setSubmitting(true);
    try {
      await login(email.trim(), password);
      toast.success('Welcome back, Admin!');
      router.replace('/admin');
    } catch (err) {
      toast.error(t.admin.invalidEmail);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return null;
  if (user) return null;

  return (
    <>
      <Head>
        <title>Admin Login — KRT Workshop</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-primary-800 to-primary-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-primary-700 px-8 py-7 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg">
                🚜
              </div>
              <h1 className="text-white text-xl font-extrabold">{t.admin.loginTitle}</h1>
              <p className="text-green-200 text-sm mt-1">{t.admin.loginSubtitle}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
              <div>
                <label htmlFor="email" className="label">{t.admin.email}</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@krtworkshop.com"
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="password" className="label">{t.admin.password}</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="input-field pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-bold py-4 rounded-xl transition-colors shadow-sm text-base"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t.admin.loggingIn}
                  </span>
                ) : (
                  `🔐 ${t.admin.login}`
                )}
              </button>

              <div className="text-center">
                <a href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                  ← Back to Website
                </a>
              </div>
            </form>
          </div>

          <p className="text-center text-green-300 text-xs mt-4 opacity-60">
            Secure Admin Access Only
          </p>
        </div>
      </div>
    </>
  );
}
