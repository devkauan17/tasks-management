import './style.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext, useEffect, useState } from 'react';
import DeleteModal from '../../components/DeleteModal';
import EditModal from '../../components/EditModal';
import { useNavigate } from 'react-router-dom';
import instance from '../../services/instance';
import UserModal from '../../components/UserModal';
import { GlobalContext } from '../../providers/globalContext';
import { spacing } from '@mui/system';

export default function Home() {

    const {
        deleteInfos, setDeleteInfos,
        editInfos, setEditInfos,
        userInfos, setUserInfos,
        handleGetUser, token
    } = useContext(GlobalContext);

    const navigate = useNavigate();

    const [addTaskValue, setAddTaskValue] = useState('');
    const [listTasks, setListTasks] = useState([]);
    const [taskError, setTaskError] = useState({
        message: '',
        type: ''
    });

    async function handleAddTask(e) {
        e.preventDefault();

        setTaskError({
            message: '',
            type: ''
        });

        try {
            await instance.post('/task', { description: addTaskValue, completed: false }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            handleListTasks();
            return setAddTaskValue('');

        } catch (error) {

            console.log(error)
            return setTaskError({ message: 'Erro interno. Tente novamente.', type: '' })
        };

    };

    async function handleListTasks() {
        try {
            const { data } = await instance.get('/tasks', {
                headers: { Authorization: `Bearer ${token}` },
            })

            return setListTasks(data.sort((a, b) => { return a.id - b.id }))
        } catch (error) {
            return console.log(error)
        }
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) { return navigate('/') }
        handleListTasks()
        handleGetUser()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteInfos, editInfos])


    return (
        <main className='page'>
            <header className='tasks-header'>
                <h1 className='title'>{!userInfos.name ? 'carregando...' : userInfos.name}</h1>
                <button className='button tasks-header-button'
                    onClick={() => setUserInfos({ ...userInfos, show: true })}
                >Minha conta</button>
            </header>

            <section className=' page-tasks center-align'>

                <h1 className='title'>Tarefas</h1>
                <form className='form-task vertical-align' onSubmit={handleAddTask}>
                    <h1 className='title'>Adicionar tarefa</h1>

                    <div className='input-button-task'>
                        <input
                            className='input'
                            type="text"
                            placeholder='Adicione uma tarefa...'
                            style={{ marginBottom: '1rem' }}
                            value={addTaskValue}
                            onChange={(e) => setAddTaskValue(e.target.value)}
                        />
                        {taskError && <span className='span-error'>{taskError.message}</span>}
                        <button className='button' type="submit" disabled={addTaskValue ? false : true}>Enviar</button>
                    </div>

                </form>
                <section className='tasks-list center-align'>
                    <h1 className='title'>Listagem de tarefas</h1>

                    {listTasks.map(task => (

                        <div className='tasks-row' key={task.id}>
                            <h2 className='task-description'
                                style={{ textDecoration: task.completed && 'line-through' }}
                            >{task.description}</h2>
                            <div className='task-actions'>
                                <DeleteIcon
                                    className='task-action'
                                    sx={{ fontSize: 'large' }}
                                    onClick={() => setDeleteInfos({ id: task.id, show: !deleteInfos.show })} />
                                <EditIcon
                                    className='task-action'
                                    sx={{ fontSize: 'large' }}
                                    onClick={() => setEditInfos({ ...task, show: true })} />
                            </div>

                        </div>
                    ))}

                </section>
            </section>
            {deleteInfos.show && <DeleteModal />}
            {editInfos.show && <EditModal />}
            {userInfos.show && <UserModal />}
        </main>
    )

}