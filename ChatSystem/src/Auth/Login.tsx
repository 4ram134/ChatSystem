import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleLogin() {
    setError('')

    if (name === '' || password === '') {
      setError('Please fill in all fields')
      return
    }

    const { data: user, error: findError } = await supabase
      .from('users')
      .select('email')
      .eq('name', name)
      .single()

    if (findError || !user) {
      setError('Incorrect Name or Password')
      return
    }

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password,
    })

    if (loginError) {
      setError('Incorrect Name or Password')
      return
    }

    console.log('Login Successful')
  }

  return (
    <div className="Loginpage">
      <h1>Login</h1>

      <input
        className="NameInput"
        type="text"
        placeholder="Jeremy"
        value={name}
        onChange={(e) => setName(e.target.value)}
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

      <p>
        Don't have an account? <button onClick={() => navigate('/Signup')}>Sign Up</button>
      </p>

       <p>or</p>

      <p>
        <button onClick = {() => navigate ('ForgotPassword')}>Forgot Password?</button> 
      </p>
    </div>
  )
}

export default Login