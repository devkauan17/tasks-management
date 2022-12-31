import { Modal } from '@mui/material'
import { useState } from 'react'
import instance from '../../services/instance'
import './style.css'

export default function EditModal({ editInfos, setEditInfos }) {

    function handleClose() {
        setEditInfos({ id: '', value: [], show: false })
    }

    async function handleEdit(e) {
        e.preventDefault()
        try {
            await instance.put(`/task/${editInfos.id}`, {
                description: editInfos.description,
                completed: editInfos.completed
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            })

            handleClose()
        } catch (error) {
            return console.log(error)
        }
    }

    return (
        <Modal
            className='center-align modal-bg'
            open={editInfos.show}
            onClose={handleClose}
        >
            <form className='modal-content vertical-align' onSubmit={handleEdit}>
                {console.log(editInfos)}
                <h1 className='title' style={{ marginBottom: '1rem' }}>Editar tarefa</h1>
                <input className='input'
                    type="text"
                    value={editInfos.description}
                    style={{ marginBottom: '1rem' }}
                    onChange={(e) => setEditInfos({ ...editInfos, description: e.target.value })} />
                <button
                    type='button'
                    className='button'
                    onClick={() => setEditInfos({ ...editInfos, completed: !editInfos.completed })}
                    style={{ backgroundColor: editInfos.completed && 'var(--lightgray)' }}>
                    {editInfos.completed ? 'Completa' : 'Incompleta'}
                </button>
                <div className='modal-buttons'>
                    <button className='button' type='submit' onClick={handleEdit} disabled={!editInfos ? true : false}>Editar</button>
                    <button className='button' type='button' onClick={handleClose}>Cancelar</button>
                </div>
            </form>
        </Modal>
    )
}