import Modal from '@mui/material/Modal';
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded';
import './style.css'
import instance from '../../services/instance';

export default function DeleteModal({ deleteInfos, setDeleteInfos }) {

    function handleClose() {
        setDeleteInfos({ id: '', show: false })
    }

    async function handleDelete(e) {
        e.preventDefault()
        try {

            await instance.delete(`/task/${deleteInfos.id}`, {
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
            open={deleteInfos.show}
            onClose={handleClose}
        >
            <div className='modal-content vertical-align'>
                <ReportProblemRoundedIcon sx={{ fontSize: '10rem' }} />
                <h1 className='title'>Quer mesmo excluir?</h1>
                <div className='modal-buttons'>
                    <button className='button' onClick={handleDelete}>Excluir</button>
                    <button className='button' onClick={handleClose}>Cancelar</button>
                </div>
            </div>

        </Modal>
    )

}