

import { useState } from 'react'
import { Link } from 'react-router-dom'
import PasswordInput from '../../components/PasswordInput'
import './style.css'

export default function Login() {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })


    return (
        <main className='page center-align'>
            <h1 className='title'>Faça o login aqui!</h1>
            <form className='form vertical-align'>
                <div className='input-label'>
                    <label className='label' htmlFor='email'>Email</label>
                    <input
                        className='input'
                        type="email"
                        placeholder='Digite um email'
                        id='email'
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
                </div>
                <div className='input-label'>
                    <label className='label' htmlFor='password'>Senha</label>
                    <PasswordInput
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                </div>
                <button className='button' type='submit'>Logar</button>
                <Link className='link' to='/register'>Não tem uma conta? Registre-se</Link>
            </form>
        </main>
    )

}