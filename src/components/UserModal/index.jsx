import { Modal } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../services/instance";
import PasswordInput from "../PasswordInput";

export default function UserModal({ userInfos, setUserInfos }) {
    const navigate = useNavigate();

    const [userModal, setUserModal] = useState({
        ...userInfos,
        currentPassword: '',
        newPassword: ''
    });

    const [userError, setUserError] = useState({ message: '', type: '' })
    const handleClose = () => setUserInfos({ ...userInfos, show: false });

    async function handleEditUser(e) {
        e.preventDefault();


        try {

            await instance.put('/user', {
                name: userModal.name,
                email: userModal.email,
                currentPassword: userModal.currentPassword,
                password: userModal.newPassword
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            location.reload()
            handleClose();
        } catch (error) {
            const message = error.response.data;

            if (message === 'A senha precisa ter no mínimo 6 caracteres.') {
                setUserModal({ ...userModal, currentPassword: '', newPassword: '' })
                return setUserError({ message, type: 'invalidPass' })
            }

            if (message === 'Senha incorreta.') {
                setUserModal({ ...userModal, currentPassword: '' })
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
                    <label className='label' htmlFor='currentPassword'>Senha Atual</label>
                    <PasswordInput
                        id='currentPassword'
                        className={userError.type === 'invalidPass' && 'input-error'}
                        value={userModal.currentPassword}
                        onChange={(e) => setUserModal({ ...userModal, currentPassword: e.target.value })}
                    />
                </div>
                <div className='input-label'>
                    <label className='label' htmlFor='newPassword'>Nova senha</label>
                    <PasswordInput
                        id='newPassword'
                        value={userModal.newPassword}
                        onChange={(e) => setUserModal({ ...userModal, newPassword: e.target.value })}
                    />
                </div>
                {userError.message && <span className='span-error'>{userError.message}</span>}
                <div className='modal-buttons'>
                    <button className='button' type='submit' disabled={
                        !userModal.name ||
                            !userModal.email ||
                            !userModal.newPassword ||
                            !userModal.currentPassword ? true : false
                    }>Atualizar dados</button>
                    <button className='button' type='button' onClick={handleLogout}>Logout</button>
                </div>
            </form>
        </Modal>
    )

}