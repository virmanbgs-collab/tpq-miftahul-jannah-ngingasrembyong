import React from 'react'
export default function SantriTable({list, onEdit, onIuran, onRaport, onDelete}) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">No</th>
            <th className="p-3 text-left">Nama</th>
            <th className="p-3 text-left">Jilid</th>
            <th className="p-3 text-left">Masuk</th>
            <th className="p-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {list.map((s,i)=> (
            <tr key={s.id} className="border-t">
              <td className="p-3">{s.no || i+1}</td>
              <td className="p-3">{s.nama}</td>
              <td className="p-3">{s.jilid}</td>
              <td className="p-3">{s.tanggal_masuk || '-'}</td>
              <td className="p-3 space-x-2">
                <button className="px-3 py-1 rounded bg-green-100" onClick={()=>onEdit(s)}>Edit</button>
                <button className="px-3 py-1 rounded bg-blue-100" onClick={()=>onIuran(s)}>Iuran</button>
                <button className="px-3 py-1 rounded bg-yellow-100" onClick={()=>onRaport(s)}>Raport</button>
                <button className="px-3 py-1 rounded bg-red-100" onClick={()=>onDelete(s.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
