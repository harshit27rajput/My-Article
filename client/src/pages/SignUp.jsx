import React, { useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useDispatch, useSelector} from 'react-redux'
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice'
import OAuth from '../Components/OAuth'

function SignUp() {
  const {loading, error:errorMessage}=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  // const [loading, setLoading] = useState(false)
  // const [errorMessage, setErrorMessage] = useState(null)
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }

  // console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("All Fields are Required"))
    }
    try {
      dispatch(signInStart())
      
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      // console.log(res)
      const data = await res.json()
      if (data.success === false) {
        return dispatch(signInFailure(data.message))
      }
      
      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
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
              <Label value='Your Email' />
              <TextInput type='text' placeholder='Email' id='email' onChange={handleChange} />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput type='password' placeholder='Password' onChange={handleChange} id='password' />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {loading ? (
                <>
                <Spinner size='sm' />
                <span className='pl-3'>loading</span>
                </>
                ):(
                  'Sign In'
                ) }
            </Button>
            <OAuth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't Have an Account ?</span>
            <Link to='/register' className='text-blue-500'>Sign Up</Link>
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

export default SignUp