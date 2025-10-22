
import React,{useState}from'react';
export default function Login({onLogin}){
 const[pwd,setPwd]=useState('');
 return(<div className='flex h-screen items-center justify-center bg-tpglight'>
  <form onSubmit={e=>{e.preventDefault();onLogin(pwd)}} className='bg-white p-8 rounded shadow w-80'>
   <h2 className='text-xl font-semibold mb-4 text-tpggreen'>Login Admin</h2>
   <input type='password' value={pwd} onChange={e=>setPwd(e.target.value)} placeholder='Password admin' className='border p-2 w-full mb-4 rounded'/>
   <button className='bg-tpggreen text-white py-2 px-4 rounded w-full'>Masuk</button>
  </form></div>);
}
