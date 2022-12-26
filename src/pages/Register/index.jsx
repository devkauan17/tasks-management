import { useState } from 'react'
import { Link } from 'react-router-dom'
import PasswordInput from '../../components/PasswordInput'
import './style.css'

export default function Register() {
    const [registerForm, setRegisterForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    async function handleSubmit() {
        try {

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className='page center-align'>
            <h1 className='title'>Crie a sua conta aqui!</h1>
            <form className='form vertical-align' onSubmit={handleSubmit}>
                <div className='input-label'>
                    <label className='label' htmlFor='name'>Nome</label>
                    <input
                        className='input'
                        type="text"
                        placeholder='Digite o seu nome'
                        id='name'
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })} />
                </div>
                <div className='input-label'>
                    <label className='label' htmlFor='email'>Email</label>
                    <input
                        className='input'
                        type="email"
                        placeholder='Digite um email'
                        id='email'
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} />
                </div>
                <div className='input-label'>
                    <label className='label' htmlFor='password'>Senha</label>
                    <PasswordInput
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    />
                </div>
                <button className='button' type='submit'>Cadastrar</button>
                <Link className='link' to='/sign-in'>Já tem uma conta? Faça login</Link>
            </form>
        </main>
    )

}