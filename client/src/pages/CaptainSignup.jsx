import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log({ fullname: { firstname, lastname }, email, password })
    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-white px-4 py-6">
      <div className="w-full max-w-md">
        <img
          className="w-24 mb-[6rem]"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber Captain"
        />

        <h2 className="text-2xl font-semibold mb-6">Register as Captain</h2>

        <form onSubmit={submitHandler}>
          <div className="flex gap-4 mb-5">
            <input
              type="text"
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First Name"
              className="w-1/2 px-4 py-2 border rounded-md bg-gray-100 text-lg outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Last Name"
              className="w-1/2 px-4 py-2 border rounded-md bg-gray-100 text-lg outline-none focus:ring-2 focus:ring-black"
            />
          </div>

         
          <div className="mb-5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-lg outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          
          <div className="mb-6">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-lg outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white text-lg font-medium py-2 rounded-md hover:bg-gray-900 cursor-pointer transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already a captain?{' '}
          <Link to="/captain-login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup
