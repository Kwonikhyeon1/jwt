import React, { useState } from 'react';
import signup from '../css/signup.css';
import instance from '../api/axios';
import { useNavigate } from 'react-router-dom';

const SignIn = ({token, setToken}) => {
    const navigate = useNavigate();
    const [m_id, setM_id] = useState('');
    const [m_pw, setM_pw] = useState('');
    const[message, setMessage] = useState('');

    const handleInputData = (event) => {
        const { name, value } = event.target;
        if (name === 'm_id') {
            setM_id(value);
        } else if (name === 'm_pw') {
            setM_pw(value);
        }
    }

    const handleSubmit = async () => {
        console.log("State values:", { m_id, m_pw });

        try {
            const response = await instance.post('/signin_confirm', {
                m_id,
                m_pw,
            });
            
            if (response.status === 200) {
                console.log("Login successful");
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                setMessage('login successful!')
                navigate('/');
                console.log(response.data);
            } else {
                console.log("Login failed");
            }

        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <section>
            <div className='section_wrap'>
                <input
                    type='text'
                    name='m_id'
                    placeholder='아이디를 입력하세요.'
                    onChange={handleInputData}
                />
                <input
                    type='password'
                    name='m_pw'
                    placeholder='비밀번호를 입력하세요.'
                    onChange={handleInputData}
                />
            </div>
            <div className='btns'>
                <input
                    type='button'
                    value="로그인"
                    onClick={handleSubmit}
                />
                <input type='button' value="취소" />
            </div>
        </section>
    );
}

export default SignIn;
