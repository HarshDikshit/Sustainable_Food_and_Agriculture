import React, { useState } from 'react'
import TableWithDataFetch from '../components/TableWithDataFetch'


function Admin() {
 
  return (
    <div className='w-full flex  flex-col p-5'>
    <h1 className='text-white flex m-auto mt-5 text-xl font-bold bg-black rounded-lg py-2 px-3'>Admin</h1>
    <TableWithDataFetch isActionVisible= {true} />
    
    </div>
  )
}

export default Admin
