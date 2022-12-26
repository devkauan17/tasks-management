import { Modal } from '@mui/material'
import { useState } from 'react'
import './style.css'

export default function EditModal({ editInfos, setEditInfos }) {

    const [editTaskValue, setEditTaskValue] = useState('')

    function handleClose() {
        setEditInfos({ id: '', show: false })
    }

    async function handleEdit(e) {
        e.preventDefault()
        try {


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
                <h1 className='title' style={{ marginBottom: '1rem' }}>Editar tarefa</h1>
                <input className='input'
                    type="text"
                    value={editTaskValue}
                    onChange={(e) => setEditTaskValue(e.target.value)} />
                <div className='modal-buttons'>
                    <button className='button' type='submit' onClick={handleEdit}>Editar</button>
                    <button className='button' type='button' onClick={handleClose}>Cancelar</button>
                </div>
            </form>
        </Modal>
    )
}