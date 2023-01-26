

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/PasswordInput'
import instance from '../../services/instance'
import './style.css'

export default function Login() {
    const navigate = useNavigate()

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const [loginError, setLoginError] = useState({ message: '', type: '' })


    async function handleLogin(e) {
        e.preventDefault();
        setLoginError({ message: '', type: '' })

        try {
            const { data } = await instance.post('/login', { ...loginForm });
            localStorage.setItem('token', data.token);
            return navigate('/dashboard')
        } catch (error) {
            const message = error.response;

            if (message === 'Email ou senha inválida.') {
                return setLoginError({ message, type: 'invalidLogin' })
            }

            if (message === 'Email no formato inválido.') {
                setLoginForm({ ...loginForm, email: '' })
                return setLoginError({ message, type: 'invalidEmail' })
            }

            if (message === 'A senha precisa ter no mínimo 6 caracteres.') {
                setLoginForm({ ...loginForm, password: '' })
                return setLoginError({ message, type: 'invalidPass' })
            }

            console.log(error.message)
            return setLoginError({ message: 'Erro interno. Tente Novamente.', type: '' })
        }

    }

    useEffect(() => {
        if (localStorage.getItem('token')) { return navigate('/dashboard') }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main className='page center-align'>
            <h1 className='title'>Gerenciamento de Tarefas</h1>
            <form className='form vertical-align' onSubmit={handleLogin}>
                <div className='input-label'>
                    <label className='label' htmlFor='email'>Email</label>
                    <input
                        className={`input ${loginError.type === 'invalidEmail' || loginError.type === 'invalidLogin' ? 'input-error' : ''}`}
                        type="email"
                        placeholder='Digite um email'
                        id='email'
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        required />
                </div>
                <div className='input-label'>
                    <label className='label' htmlFor='password'>Senha</label>
                    <PasswordInput
                        className={loginError.type === 'invalidLogin' || loginError.type === 'invalidPass' ? 'input-error' : ''}
                        id='password'
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                </div>
                <button className='button' type='submit' disabled={!loginForm.email || !loginForm.password ? true : false}>Logar</button>
                {loginError.message && <span className='span-error'>{loginError.message}</span>}
                <Link className='link' to='/register'>Não tem uma conta? Registre-se</Link>
            </form>
        </main>
    )

}