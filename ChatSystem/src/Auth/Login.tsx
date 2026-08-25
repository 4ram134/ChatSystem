import { useState } from 'react'
import { supabase } from '../lib/supabase'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin() {
    setError('')

    if (email === '' || password === '') {
      setError('Please fill in all fields')
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Incorrect Email or Password')
      return
    }

    console.log('Login Successful')
  }

  return (
    <div className="Loginpage">
      <h1>Login</h1>
      <input
        className="NameInput"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="PasswordInput"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="LoginButton" onClick={handleLogin} type="button">
        Login
      </button>
      {error && <p>{error}</p>}
      <p>Don't have an account?</p>
    </div>
  )
}

export default Login;