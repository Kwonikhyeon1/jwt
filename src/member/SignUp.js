import React, { useState } from 'react';
import signup from '../css/signup.css';
import instance from '../api/axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [m_id, setM_id] = useState('');
    const [m_pw, setM_pw] = useState('');
    const [m_mail, setM_mail] = useState('');
    const [m_phone, setM_phone] = useState('');

    const handleInputData = (event) => {
        const { name, value } = event.target;
        if (name === 'm_id') setM_id(value);
        else if (name === 'm_pw') setM_pw(value);
        else if (name === 'm_mail') setM_mail(value);
        else if (name === 'm_phone') setM_phone(value);
    }

    const handleSubmit = async () => {
        console.log("State values:", { m_id, m_pw, m_mail, m_phone });

        try {
            const response = await instance.post('/signup_confirm', {
                m_id,
                m_pw,
                m_mail,
                m_phone
            });
            console.log("success", response.data);
            navigate('/'); 

        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <section>
            <div className='section_wrap'>
                <input type='text' name='m_id' placeholder='아이디를 입력하세요.' onChange={handleInputData} />
                <input type='password' name='m_pw' placeholder='비밀번호를 입력하세요.' onChange={handleInputData} />
                <input type='text' name='m_mail' placeholder='메일를 입력하세요.' onChange={handleInputData} />
                <input type='text' name='m_phone' placeholder='전화번호를 입력하세요.' onChange={handleInputData} />
            </div>
            <div className='btns'>
                <input type='button' value="회원가입" onClick={handleSubmit} />
                <input type='reset' value="초기화" />
            </div>
        </section>
    );
}

export default SignUp;
