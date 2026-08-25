import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSignup() {
    setError('')

    if (name === '' || password === '') {
      setError('Please fill in all fields')
      return
    }

    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('name')
      .eq('name', name)
      .maybeSingle()

    if (checkError) {
      setError('Something went wrong')
      return
    }

    if (existingUser) {
      setError('Name is already taken')
      return
    }

    const { error: signupError } = await supabase
      .from('users')
      .insert({
        name,
        password,
      })

    if (signupError) {
      setError('Could not create account')
      return
    }

    console.log('Signup Successful')
  }

  return (
    <div className="Signuppage">
      <h1>Sign Up</h1>

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

      <button
        className="SignupButton"
        onClick={handleSignup}
        type="button"
      >
        Sign Up
      </button>

       {error && <p>{error}</p>}

        <p>
          Already have an account? <button onClick={() => navigate('/Login')}>Login</button>
        </p>
    </div>
  )
}

export default Signup