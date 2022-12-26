import './style.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import DeleteModal from '../../components/DeleteModal';

export default function Home() {

    const [deleteInfos, setDeleteInfos] = useState({
        id: '',
        show: false
    })

    const [editInfos, setEditInfos] = useState({
        id: '',
        show: false
    })

    return (
        <main className='page page-tasks center-align'>
            <h1 className='title'>Tarefas</h1>
            <form className='form-task vertical-align'>
                <h1 className='title'>Adicionar tarefa</h1>

                <div className='input-button-task'>
                    <input className='input' type="text" style={{ marginBottom: '1rem' }} />
                    <button className='button' type="submit">Enviar</button>
                </div>

            </form>
            <section className='tasks-list center-align'>
                <h1 className='title'>Listagem de tarefas</h1>

                <div className='tasks-row'>
                    <h2 className='task-description'>descrição</h2>
                    <div className='task-actions'>
                        <DeleteIcon
                            className='task-action'
                            sx={{ fontSize: 'large' }}
                            onClick={() => setDeleteInfos({ ...deleteInfos, show: true })} />
                        <EditIcon
                            className='task-action'
                            sx={{ fontSize: 'large' }}
                            onClick={() => setEditInfos({ ...editInfos, show: !editInfos.show })} />
                    </div>

                </div>


            </section>
            {deleteInfos.show && <DeleteModal deleteInfos={deleteInfos} setDeleteInfos={setDeleteInfos} />}
            {/* {editInfos.show && } */}
        </main>
    )

}