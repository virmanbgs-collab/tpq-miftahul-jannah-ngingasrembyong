
import React from'react';
export default function Dashboard({santriList}){
 return(<div className='grid gap-4 grid-cols-1 md:grid-cols-3'>
  <div className='p-4 bg-white rounded shadow'>
   <div>Total Santri</div>
   <div className='text-2xl font-bold'>{santriList.length}</div>
  </div>
 </div>);
}
