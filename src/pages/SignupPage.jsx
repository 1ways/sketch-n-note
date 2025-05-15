import { useState } from 'react'
import { Link, Navigate } from 'react-router'

import zxcvbn from 'zxcvbn'

import { saveUser, login } from '../utility/auth'

export default function SignupPage() {
    // States
    const [password, setPassword] = useState('')
    const [passwordScore, setPasswordScore] = useState(null)
    const [isPasswordsMatch, setIsPasswordsMath] = useState(true)
    const [redirect, setRedirect] = useState(false)

    function checkPassword(e) {
        setPassword(e.currentTarget.value)

        if (e.currentTarget.value) {
            const result = zxcvbn(e.currentTarget.value)
            setPasswordScore(result.score)
        }
    }

    function getLabelColor() {
        switch(passwordScore) {
            case 0: return '#FF4D4D'
            case 1: return '#FFA64D'
            case 2: return '#FFEE4D'
            case 3: return '#4DCD5A'
            case 4: return '#2B8AFF'
            default: return ''
        }
    }

    function getStrengthLabel () {
        switch(passwordScore) {
            case 0: return 'Very weak'
            case 1: return 'Weak'
            case 2: return 'Fair'
            case 3: return 'Good'
            case 4: return 'Strong'
            default: return ''
        }
    }

    // Form submitting logic
    function handleSubmit(e) {
        e.preventDefault()
    
        const form = e.currentTarget

        const formData = new FormData(form)

        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password')
        const confirmPassword = formData.get('confirm-password')

        if (password === confirmPassword) {
            const userData = {
                name,
                email,
                password
            }

            // Save user to the localStorage and update isLogged value
            saveUser(userData)
            login()

            setRedirect(true)
        } else {
            setIsPasswordsMath(false)
        }
    }

    // Redirect user to the board page
    if (redirect) {
        return <Navigate to='/board' />
    }

    return (
        <main className='main-auth'>
            <section className='section'>
                <h1 className='section__title'>Create Your Free Account</h1>
                <p className='section__text'>Join Sketch’n’Note and start capturing your ideas in a whole new way. It’s fast, easy, and free!</p>
                <form className='form auth-form' onSubmit={handleSubmit}>
                    <label className='form__label' htmlFor='name'>
                        Your name:
                        <input 
                            className='form__input' 
                            type='text' 
                            name='name'
                            id='name'
                            placeholder='John Smith'
                            minLength={1}
                            maxLength={100}
                            pattern='[A-Za-z0-9 ]+' 
                            required
                        />
                    </label>
                    <label className='form__label' htmlFor='email'>
                        Your email:
                        <input 
                            className='form__input' 
                            type='email' 
                            name='email'
                            id='email'
                            placeholder='jonhn@example.com'
                            minLength={1}
                            maxLength={100} 
                            required
                        />
                    </label>
                    <label className='form__label' htmlFor='password'>
                        Password:
                        <input 
                            className='form__input' 
                            type='password' 
                            name='password'
                            id='password'
                            value={password}
                            onChange={checkPassword}
                            autoComplete='on'
                            required
                        />
                        {password !== '' && <span className='auth-form__message' style={{color: getLabelColor()}}>{getStrengthLabel()}</span>}
                    </label>
                    <label className='form__label' htmlFor='confirm-password'>
                        Confirm password:
                        <input 
                            className='form__input' 
                            type='password' 
                            name='confirm-password'
                            id='confirm-password'
                            autoComplete='on'
                            required
                        />
                        {!isPasswordsMatch && <span className='auth-form__message'>Passwords don't match</span>}
                    </label>
                    <button className='primary-btn' type='submit'>Sign Up Now</button>
                </form>
                <p className='section__text auth__text'>Already have an account? <Link to='/login'>Log in here</Link></p>
                <p className='section__text'>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
            </section>
        </main>
    )
}