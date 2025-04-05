import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url("bg.png")] h-screen  pt-4 w-full flex items-center justify-between flex-col bg-red-400'>
          <div className='w-full'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" className='w-16 sm:w-32 ml-8'/>
          </div>
            <div className=' bg-white p-4 sm:p-8 w-full sm:w-2/4'>
                <h2 className='text-3xl font-bold'>Get Started with Uberz</h2>
                <Link to="/login" className='w-full flex items-center justify-center bg-black text-white py-3 rounded mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home;