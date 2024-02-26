import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'

function SignIn() {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }

  // console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All Fields are Required")
    }
    try {
      setErrorMessage(null)
      setLoading(true)
      
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      // console.log(res)
      const data = await res.json()
      if (data.success === false) {
        return setErrorMessage(data.message)
      }
      setLoading(false)
      if (res.ok) {
        navigate('/login')
      }
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }

  }
  return (
    <div className='mt-20 min-h-screen'>

      <div className='flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center gap-5' >

        <div className='flex-1'>
          <Link to='/' className='font-bold text-4xl dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Harshit's</span>Blog
          </Link>
          <p className='text-sm mt-5'>this is a demo project.you can signup with email,password or with Google.</p>
        </div>

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Username' />
              <TextInput type='text' placeholder='Username' id='username' onChange={handleChange} />
            </div>
            <div>
              <Label value='Your Email' />
              <TextInput type='text' placeholder='Email' id='email' onChange={handleChange} />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput type='text' placeholder='Password' onChange={handleChange} id='password' />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {loading ? (
                <>
                <Spinner size='sm' />
                <span className='pl-3'>loading</span>
                </>
                ):(
                  'Sign Up'
                ) }
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span> Have an Account</span>
            <Link to='/login' className='text-blue-500'>Login</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color="failure">
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SignIn