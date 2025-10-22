import React from 'react'
export default function Dashboard({santriList}) {
  const totalSantri = santriList.length
  const totalIuran = santriList.reduce((acc,s)=>acc + (s.payments?.reduce((a,b)=>a+(b.jumlah||0),0)||0),0)
  const avgNilai = (()=> {
    const all=[]
    santriList.forEach(s=> s.assessments?.forEach(a=> all.push(a.avg||0)))
    if(!all.length) return 0
    return (all.reduce((a,b)=>a+b,0)/all.length).toFixed(2)
  })()
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-500">Total Santri</div>
        <div className="text-2xl font-semibold">{totalSantri}</div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-500">Total Iuran (Rp)</div>
        <div className="text-2xl font-semibold">{totalIuran}</div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <div className="text-sm text-gray-500">Rata-rata Nilai</div>
        <div className="text-2xl font-semibold">{avgNilai}</div>
      </div>
    </div>
  )
}
