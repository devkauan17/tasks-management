import { Modal } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../services/instance";
import PasswordInput from "../PasswordInput";

export default function UserModal({ userInfos, setUserInfos }) {
    const navigate = useNavigate();

    const [userModal, setUserModal] = useState({
        ...userInfos,
        password: '',
        confirmPassword: ''
    });

    const [userError, setUserError] = useState({ message: '', type: '' })
    const handleClose = () => setUserInfos({ ...userInfos, show: false });

    async function handleEditUser(e) {
        e.preventDefault();


        try {

            await instance.put('/user', {
                name: userModal.name,
                email: userModal.email,
                password: userModal.password
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            handleClose();
        } catch (error) {
            const message = error.response.data;

            if (message === 'A senha precisa ter no mínimo 6 caracteres.') {
                setUserModal({ ...userModal, password: '', confirmPassword: '' })
                return setUserError({ message, type: 'invalidPass' })
            }

            if (message === 'Email já cadastrado.' || message === 'Email no formato inválido.') {
                setUserModal({ ...userModal, email: '' })
                return setUserError({ message, type: 'invalidEmail' })
            }

            console.log(error);
            return setUserError({ message: 'Erro interno. Tente Novamente.', type: '' });
        }
    };

    function handleLogout() {
        localStorage.clear();
        navigate('/');
    };

    return (
        <Modal className='center-align modal-bg'
            open={userInfos.show}
            onClose={handleClose}
        >
            <form className='modal-content vertical-align' onSubmit={handleEditUser}>
                <h1 className='title'>Edite seu cadastro</h1>
                <div className='input-label'>
                    <label className='label' htmlFor='name'>Nome</label>
                    <input
                        required
                        className='input'
                        type="text"
                        placeholder='Digite o seu nome...'
                        id='name'
                        value={userModal.name}
                        onChange={(e) => setUserModal({ ...userModal, name: e.target.value })}
                    />
                </div>
                <div className='input-label'>
                    <label className='label' htmlFor='email'>Email</label>
                    <input
                        required
                        className={`input ${userError.type === 'invalidEmail' && 'input-error'}`}
                        type="text"
                        placeholder='Digite o seu email...'
                        id='email'
                        value={userModal.email}
                        onChange={(e) => setUserModal({ ...userModal, email: e.target.value })}
                    />
                </div>
                <div className='input-label'>
                    <label className='label' htmlFor='password'>Senha</label>
                    <PasswordInput
                        id='password'
                        className={userError.type === 'invalidPass' && 'input-error'}
                        value={userModal.password}
                        onChange={(e) => setUserModal({ ...userModal, password: e.target.value })}
                    />
                </div>
                <div className='input-label'>
                    <label className='label' htmlFor='confirmPassword'>Confirmar senha</label>
                    <PasswordInput
                        id='confirmPassword'
                        value={userModal.confirmPassword}
                        onChange={(e) => setUserModal({ ...userModal, confirmPassword: e.target.value })}
                    />
                </div>
                {userError.message && <span className='span-error'>{userError.message}</span>}
                <div className='modal-buttons'>
                    <button className='button' type='submit' disabled={!userModal.name ||
                        !userModal.email ||
                        !userModal.password ||
                        !userModal.confirmPassword ||
                        (userModal.password !== userModal.confirmPassword) ? true : false}>Atualizar dados</button>
                    <button className='button' type='button' onClick={handleLogout}>Logout</button>
                </div>
            </form>
        </Modal>
    )

}