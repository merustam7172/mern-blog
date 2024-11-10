import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase'

import { useDispatch } from 'react-redux'
import { signInSuccess,signInStart, signInFailure  } from '../redux/user/userSlice.js'
import { useNavigate } from 'react-router-dom'


const OAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = getAuth(app);
    const handleGoogleClick = async() => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt : 'select_account'})

        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            console.log(resultFromGoogle);

            const res = await fetch('/api/auth/google', {
                method : 'POST',
                headers :  {'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    name : resultFromGoogle.user.displayName,
                    email : resultFromGoogle.user.email,
                    googlePhotoUrl : resultFromGoogle.user.photoURL
                }),
            })

            const data = await res.json();

            if(res.ok){
                dispatch(signInSuccess(data));
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
      <Button type='button' className='w-full' onClick={handleGoogleClick} gradientDuoTone='pinkToOrange' outline >
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
      </Button>
    </div>
  )
}

export default OAuth
