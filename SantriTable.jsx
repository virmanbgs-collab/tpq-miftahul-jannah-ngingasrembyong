
import React from'react';
export default function SantriTable({list}){
 return(<table className='min-w-full bg-white rounded shadow'>
  <thead><tr><th>No</th><th>Nama</th><th>Jilid</th></tr></thead>
  <tbody>{list.map((s,i)=>(<tr key={s.id}><td>{i+1}</td><td>{s.nama}</td><td>{s.jilid}</td></tr>))}</tbody>
 </table>);
}
