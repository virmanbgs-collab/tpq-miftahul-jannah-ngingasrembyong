
import React,{useState,useEffect}from'react'
import {v4 as uuidv4}from'uuid'
import Login from'./components/Login'
import Dashboard from'./components/Dashboard'
import SantriTable from'./components/SantriTable'
import {load,save}from'./utils/storage'

export default function App(){
 const[santri,setSantri]=useState(()=>load('tpq_data',[]))
 const[user,setUser]=useState(()=>load('tpq_auth',{loggedIn:false}))
 const[view,setView]=useState('dashboard')
 useEffect(()=>save('tpq_data',santri),[santri])
 useEffect(()=>save('tpq_auth',user),[user])

 function handleLogin(pwd){
  const stored=localStorage.getItem('tpq_pwd')||'admin123'
  if(pwd===stored){setUser({loggedIn:true})}else alert('Password salah!')
 }

 if(!user.loggedIn)return<Login onLogin={handleLogin}/>

 return(<div className='p-6'>
  <h1 className='text-2xl font-bold text-tpggreen mb-4'>TPQ Miftahul Jannah Ngingas</h1>
  <nav className='space-x-2 mb-4'>
   <button onClick={()=>setView('dashboard')}>Dashboard</button>
   <button onClick={()=>setView('data')}>Data Santri</button>
  </nav>
  {view==='dashboard'&&<Dashboard santriList={santri}/>}
  {view==='data'&&<SantriTable list={santri}/>}
 </div>)
}
