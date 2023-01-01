import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/PasswordInput'
import instance from '../../services/instance'
import './style.css'

export default function Register() {
    const navigate = useNavigate()

    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [registerError, setRegisterError] = useState({ message: '', type: '' })

    async function handleRegister(e) {
        e.preventDefault();
        setRegisterError({ message: '', type: '' })

        try {
            await instance.post('/user', { ...registerForm })
            navigate('/')
        } catch (error) {
            const message = error.response.data;

            if (message === 'Email já cadastrado.' || message === 'Email no formato inválido.') {
                setRegisterForm({ ...registerForm, email: '' })
                return setRegisterError({ message, type: 'invalidEmail' })
            }

            if (message === 'A senha precisa ter no mínimo 6 caracteres.') {
                setRegisterForm({ ...registerForm, password: '' })
                return setRegisterError({ message, type: 'invalidPass' })
            }

            console.log(error)
            return setRegisterError({ message: 'Erro interno. Tente Novamente.', type: undefined })
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) { return navigate('/dashboard') }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <main className='page center-align'>
            <h1 className='title'>Crie a sua conta</h1>
            <form className='form vertical-align' onSubmit={handleRegister}>
                <div className='input-label'>
                    <label className='label' htmlFor='name'>Nome</label>
                    <input
                        className='input'
                        type="text"
                        placeholder='Digite o seu nome'
                        id='name'
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        required />
                </div>
                <div className='input-label'>
                    <label className='label' htmlFor='email'>Email</label>
                    <input
                        className={`input ${registerError.type === 'invalidEmail' && 'input-error'}`}
                        type="email"
                        placeholder='Digite um email'
                        id='email'
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        required />
                </div>
                <div className='input-label'>
                    <label className='label' htmlFor='password'>Senha</label>
                    <PasswordInput
                        id='password'
                        className={registerError.type === 'invalidPass' && 'input-error'}
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    />
                </div>
                <button
                    className='button'
                    type='submit'
                    disabled={
                        !registerForm.name ||
                            !registerForm.email ||
                            !registerForm.password ? true : false}
                >Cadastrar</button>
                {registerError.message && <span className='span-error'>{registerError.message}</span>}
                <Link className='link' to='/'>Já tem uma conta? Faça login</Link>
            </form>
        </main>
    )

}