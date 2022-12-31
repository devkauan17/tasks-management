

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

    const [loginError, setLoginError] = useState({
        message: '',
        show: false,
    })


    async function handleLogin(e) {
        e.preventDefault();

        try {
            setLoginError({ message: '', show: false })
            const { data } = await instance.post('/login', { ...loginForm });
            localStorage.setItem('token', data.token);
            return navigate('/dashboard')
        } catch (error) {
            if (error.response.data === 'Email ou senha inválida.') {
                return setLoginError({ message: error.response.data, show: true })
            }
            return console.log(error)
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
                        className='input'
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
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                </div>
                <button className='button' type='submit' disabled={!loginForm.email || !loginForm.password ? true : false}>Logar</button>
                {loginError.show && <span className='span-error'>{loginError.message}</span>}
                <Link className='link' to='/register'>Não tem uma conta? Registre-se</Link>
            </form>
        </main>
    )

}