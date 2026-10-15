import { signIn, auth } from '@/auth'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Login — Conselho Digital' }

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>
}) {
  const session = await auth()
  if (session) redirect('/admin')

  const { error } = await searchParams

  return (
    <main style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
      fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif",
      padding: '20px',
    }}>
      <div style={{
        width: '100%', maxWidth: '400px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: '20px',
        padding: '48px 40px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        textAlign: 'center',
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '32px' }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: '0 auto 12px', display: 'block' }}>
            <rect width="48" height="48" rx="12" fill="#00bcff" fillOpacity="0.12"/>
            <path d="M24 8L10 16v10c0 8 6 14 14 16 8-2 14-8 14-16V16L24 8z" stroke="#00bcff" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
            <path d="M18 24l4 4 8-8" stroke="#00bcff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>
            Conselho<span style={{ color: '#00bcff' }}>Digital</span>
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '4px', letterSpacing: '0.5px' }}>
            ADMIN · ÁREA RESTRITA
          </div>
        </div>

        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', marginBottom: '32px', lineHeight: 1.6 }}>
          Acesso exclusivo para administradores autorizados.
        </p>

        <form action={async () => {
          'use server'
          await signIn('google', { redirectTo: '/admin' })
        }}>
          <button type="submit" style={{
            width: '100%', padding: '13px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            background: '#fff', color: '#1a1a1a',
            border: 'none', borderRadius: '12px',
            fontSize: '14px', fontWeight: 600,
            cursor: 'pointer', transition: 'opacity .2s',
          }}>
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.5 29.3 4.5 24 4.5 12.7 4.5 3.5 13.7 3.5 25S12.7 45.5 24 45.5c11 0 20.5-8 20.5-20.5 0-1.3-.1-2.7-.4-5z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16.1 19 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34 6.5 29.3 4.5 24 4.5c-7.7 0-14.3 4.4-17.7 10.2z"/>
              <path fill="#4CAF50" d="M24 45.5c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 37 26.8 38 24 38c-5.2 0-9.6-3.3-11.2-7.9l-6.6 5.1C9.6 41 16.3 45.5 24 45.5z"/>
              <path fill="#1565C0" d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.5l6.2 5.2C40.9 35.6 44 30.8 44 25c0-1.3-.1-2.7-.4-5z"/>
            </svg>
            Entrar com Google
          </button>
        </form>

        {error && (
          <p style={{
            marginTop: '20px', fontSize: '13px',
            color: '#ff6b6b', background: 'rgba(255,107,107,0.1)',
            border: '1px solid rgba(255,107,107,0.2)',
            borderRadius: '8px', padding: '10px 14px',
          }}>
            Acesso negado. Use a conta Google autorizada.
          </p>
        )}
      </div>
    </main>
  )
}
