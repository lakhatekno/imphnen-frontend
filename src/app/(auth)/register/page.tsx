'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Pendaftaran gagal');
      }
      
      setForm({ name: '', email: '', phone: '', password: '', confPassword: '' });
      router.push('/login');
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Gagal membuat akun. Pastikan data sudah benar' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-fit px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-8">
          <Image src={'/logo.png'} width={70} height={70} alt="Kerja Merdeka logo" />
          <h1 className="text-3xl font-bold mt-4 mb-2 text-slate-800">Buat Akun Baru</h1>
          <p className="text-slate-600">
            atau
            <Link href={'/login'} className="font-semibold text-accent hover:underline ml-1">
              login di sini
            </Link>
          </p>
        </div>

        {/* Form Card */}
        <div className="p-8 bg-white rounded-lg shadow-md shadow-slate-300">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {message && (
              <div
                className={`text-sm p-2 rounded ${
                  message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-slate-700 mb-1">
                Alamat Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="email"
                required
                className="px-1 py-1 text-sm text-slate-900 border-b-1 w-full border-b-slate-400 focus:outline-none focus:border-b-2 focus:border-accent"
              />
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-slate-700 mb-1">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="nama lengkap"
                required
                className="px-1 py-1 text-sm text-slate-900 border-b-1 w-full border-b-slate-400 focus:outline-none focus:border-b-2 focus:border-accent"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs font-medium text-slate-700 mb-1">
                Nomor hp <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+6281212312345"
                required
                className="px-1 py-1 text-sm text-slate-900 border-b-1 w-full border-b-slate-400 focus:outline-none focus:border-b-2 focus:border-accent"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-slate-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                required
                className="px-1 py-1 text-sm text-slate-900 border-b-1 w-full border-b-slate-400 focus:outline-none focus:border-b-2 focus:border-accent"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confPassword" className="block text-xs font-medium text-slate-700 mb-1">
                Konfirmasi Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confPassword"
                name="confPassword"
                value={form.confPassword}
                onChange={handleChange}
                placeholder="********"
                required
                className="px-1 py-1 text-sm text-slate-900 border-b-1 w-full border-b-slate-400 focus:outline-none focus:border-b-2 focus:border-accent"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full bg-accent text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50"
            >
              {loading ? 'Mendaftar...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
