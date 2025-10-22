import React, {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import SantriTable from './components/SantriTable'
import Modal from './components/Modal'
import { load, save } from './utils/storage'

function initialForm() {
  return {
    no: '', nama: '', no_induk: '', nik: '', no_kk: '', tempat_tgl_lahir: '',
    jilid: '1', jenis_kelamin: 'L', nama_ayah: '', nama_ibu: '', pekerjaan_ayah: '',
    pekerjaan_ibu: '', alamat: '', tanggal_masuk: '', tanggal_naik_jilid: '', payments:[], assessments:[]
  }
}

export default function App() {
  const [santriList, setSantriList] = useState(()=> load('tpq_data', []))
  const [form, setForm] = useState(initialForm())
  const [editingId, setEditingId] = useState(null)
  const [user, setUser] = useState(()=> load('tpq_auth', { loggedIn:false }))
  const [view, setView] = useState('dashboard')
  const [selected, setSelected] = useState(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(()=> save('tpq_data', santriList), [santriList])
  useEffect(()=> save('tpq_auth', user), [user])

  function handleLogin(pwd) {
    const stored = localStorage.getItem('tpq_admin_pwd') || 'admin123'
    if(pwd === stored) setUser({ loggedIn:true })
    else alert('Password salah')
  }

  function tambahSantri(e) {
    e?.preventDefault?.()
    if(!form.nama) return alert('Nama harus diisi')
    if(editingId) {
      setSantriList(santriList.map(s => s.id === editingId ? { ...s, ...form } : s))
    } else {
      setSantriList([...santriList, { id: uuidv4(), ...form }])
    }
    setForm(initialForm()); setEditingId(null); setShowForm(false)
  }

  function editSantri(s) { setForm({ ...s }); setEditingId(s.id); setShowForm(true) }
  function hapusSantri(id) { if(confirm('Hapus data?')) setSantriList(santriList.filter(s=>s.id!==id)) }

  if(!user.loggedIn) return <Login onLogin={handleLogin} />

  return (
    <div className="p-6">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-tpggreen">TPQ Miftahul Jannah Ngingas</h1>
        <nav className="space-x-2">
          <button onClick={()=>setView('dashboard')} className="px-3 py-1">Dashboard</button>
          <button onClick={()=>setView('data')} className="px-3 py-1">Data Santri</button>
          <button onClick={()=>{
            setUser({ loggedIn:false }); localStorage.setItem('tpq_auth', JSON.stringify({ loggedIn:false }))
          }} className="px-3 py-1">Logout</button>
        </nav>
      </header>

      {view==='dashboard' && <Dashboard santriList={santriList} />}

      {view==='data' && (
        <div>
          <div className="flex gap-2 items-center mb-4">
            <button className="bg-tpggreen text-white px-3 py-2 rounded" onClick={()=>{ setShowForm(true); setForm(initialForm()); setEditingId(null) }}>Tambah Santri</button>
            <button className="px-3 py-2 border rounded" onClick={()=>{
              const csvHeader = ['NO','NAMA_LENGKAP','NO_INDUK','NIK','NO_KK','TEMPAT_TGL_LAHIR','JILID','JENIS_KELAMIN','NAMA_AYAH','NAMA_IBU','PEKERJAAN_AYAH','PEKERJAAN_IBU','ALAMAT_LENGKAP','TANGGAL_MASUK','TANGGAL_NAIK_JILID']
              const rows = santriList.map(s=>[s.no,s.nama,s.no_induk,s.nik,s.no_kk,s.tempat_tgl_lahir,s.jilid,s.jenis_kelamin,s.nama_ayah,s.nama_ibu,s.pekerjaan_ayah,s.pekerjaan_ibu,s.alamat,s.tanggal_masuk,s.tanggal_naik_jilid])
              const csv = [csvHeader, ...rows].map(r=>r.map(c=>`"${String(c||'').replace(/"/g,'""')}"`).join(',')).join('\n')
              const blob = new Blob([csv], { type: 'text/csv' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a'); a.href = url; a.download = 'santri_export.csv'; a.click()
            }}>Ekspor CSV</button>
          </div>

          <SantriTable list={santriList} onEdit={editSantri} onIuran={()=>{}} onRaport={()=>{}} onDelete={hapusSantri} />

          {showForm && (
            <Modal title={editingId ? 'Edit Santri' : 'Tambah Santri'} onClose={()=>setShowForm(false)}>
              <form onSubmit={tambahSantri} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input placeholder="NO" value={form.no} onChange={e=>setForm({...form,no:e.target.value})} className="p-2 border rounded" />
                <input placeholder="NAMA LENGKAP" value={form.nama} onChange={e=>setForm({...form,nama:e.target.value})} className="p-2 border rounded" />
                <input placeholder="NO. INDUK" value={form.no_induk} onChange={e=>setForm({...form,no_induk:e.target.value})} className="p-2 border rounded" />
                <input placeholder="NIK" value={form.nik} onChange={e=>setForm({...form,nik:e.target.value})} className="p-2 border rounded" />
                <input placeholder="NO. KK" value={form.no_kk} onChange={e=>setForm({...form,no_kk:e.target.value})} className="p-2 border rounded" />
                <input placeholder="TEMPAT TGL LAHIR" value={form.tempat_tgl_lahir} onChange={e=>setForm({...form,tempat_tgl_lahir:e.target.value})} className="p-2 border rounded" />
                <select value={form.jilid} onChange={e=>setForm({...form,jilid:e.target.value})} className="p-2 border rounded">
                  <option value="1">Jilid 1</option><option value="2">Jilid 2</option><option value="3">Jilid 3</option>
                  <option value="4">Jilid 4</option><option value="5">Jilid 5</option><option value="6">Jilid 6</option><option value="7">Jilid 7</option>
                </select>
                <select value={form.jenis_kelamin} onChange={e=>setForm({...form,jenis_kelamin:e.target.value})} className="p-2 border rounded">
                  <option value="L">L</option><option value="P">P</option>
                </select>
                <input placeholder="NAMA AYAH" value={form.nama_ayah} onChange={e=>setForm({...form,nama_ayah:e.target.value})} className="p-2 border rounded" />
                <input placeholder="NAMA IBU" value={form.nama_ibu} onChange={e=>setForm({...form,nama_ibu:e.target.value})} className="p-2 border rounded" />
                <input placeholder="PEKERJAAN AYAH" value={form.pekerjaan_ayah} onChange={e=>setForm({...form,pekerjaan_ayah:e.target.value})} className="p-2 border rounded" />
                <input placeholder="PEKERJAAN IBU" value={form.pekerjaan_ibu} onChange={e=>setForm({...form,pekerjaan_ibu:e.target.value})} className="p-2 border rounded" />
                <input placeholder="ALAMAT LENGKAP" value={form.alamat} onChange={e=>setForm({...form,alamat:e.target.value})} className="p-2 border rounded" />
                <input type="date" placeholder="TANGGAL MASUK" value={form.tanggal_masuk} onChange={e=>setForm({...form,tanggal_masuk:e.target.value})} className="p-2 border rounded" />
                <input type="date" placeholder="TANGGAL NAIK JILID" value={form.tanggal_naik_jilid} onChange={e=>setForm({...form,tanggal_naik_jilid:e.target.value})} className="p-2 border rounded" />
                <div className="col-span-1 md:col-span-2 flex gap-2">
                  <button className="bg-tpggreen text-white px-3 py-2 rounded" type="submit">Simpan</button>
                  <button type="button" className="px-3 py-2 border rounded" onClick={()=>{ setShowForm(false); setForm(initialForm()); }}>Batal</button>
                </div>
              </form>
            </Modal>
          )}
        </div>
      )}

      <footer className="mt-6 text-sm text-gray-500">Data tersimpan di browser (localStorage). Gunakan Ekspor CSV untuk backup.</footer>
    </div>
  )
}
