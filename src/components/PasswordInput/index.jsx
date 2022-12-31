import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useEffect, useState } from 'react';
import './style.css'

export default function PasswordInput({ ...props }) {
    const [visibility, setVisibility] = useState(false)

    useEffect(() => {
        setVisibility(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='password-content'>
            <input
                className='input'
                type={visibility ? 'text' : 'password'}
                placeholder='Digite uma senha'
                id='password'
                value={props.value}
                onChange={props.onChange}
                required />
            <button className='password-button'
                type='button'
                onClick={() => setVisibility(!visibility)}
                style={{ backgroundColor: visibility && 'var(--lightgray)' }}>
                {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
        </div>
    )

}