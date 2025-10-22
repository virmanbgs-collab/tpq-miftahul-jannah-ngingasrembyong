import React, {useState} from 'react'

export default function Login({onLogin}) {
  const [pwd, setPwd] = useState('')
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-tpglight to-white p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 bg-gradient-to-b from-tpggreen/20 to-white flex flex-col justify-center">
          <svg viewBox="0 0 200 120" className="w-full h-40 mb-4">
            <defs>
              <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#2f855a" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#68d391" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <rect width="200" height="120" rx="8" fill="url(#g)" />
          </svg>
          <h2 className="text-2xl font-semibold text-tpggreen">TPQ Miftahul Jannah Ngingas</h2>
          <p className="text-sm text-gray-600 mt-2">Sistem manajemen santri & iuran</p>
        </div>

        <div className="p-8">
          <h3 className="text-xl font-semibold mb-4">Login Admin</h3>
          <form onSubmit={(e)=>{e.preventDefault(); onLogin(pwd)}} className="space-y-4">
            <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="Password admin" className="w-full p-3 border rounded" />
            <button className="w-full bg-tpggreen text-white py-3 rounded">Masuk</button>
          </form>
          <p className="text-xs text-gray-500 mt-4">Default password: <strong>admin123</strong>. Ubah di Pengaturan setelah login.</p>
        </div>
      </div>
    </div>
  )
}
