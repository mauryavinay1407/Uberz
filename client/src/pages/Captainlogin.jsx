import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(email, password)
    setEmail('')
    setPassword('')
  }

  return (
    <div className="h-screen w-full flex flex-col justify-between items-center bg-white px-4 py-4">
      <div className="w-full max-w-md">
        <img
          className="w-24 mb-2"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Captain Uber"
        />

        <form onSubmit={submitHandler}>
          <h2 className="text-2xl font-semibold mb-6">Sign in as Captain</h2>

          <div className="mb-5">
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-lg outline-none focus:ring-2 focus:ring-black"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-gray-100 text-lg outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white text-lg font-medium py-2 rounded-md hover:bg-gray-900 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Join a fleet?{' '}
          <Link to="/captain-signup" className="text-blue-600 hover:underline">
            Register as a Captain
          </Link>
        </p>
      </div>

      <div className="w-full max-w-md">
        <Link
          to="/login"
          className="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-md transition"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin
