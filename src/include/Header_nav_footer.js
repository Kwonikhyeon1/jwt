import React from 'react';
import './header_nav_footer.css';
import { Link, useNavigate } from 'react-router-dom';

const HeaderNavFooter = ({token}, {setToken}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 로컬 스토리지에서 토큰 제거
        localStorage.removeItem('token');
        // 부모 컴포넌트의 token 상태를 업데이트
        setToken('');
        // 홈 페이지로 리다이렉트
        navigate('/');
    };

    return (
        <div>
            <header>
                <div className='header_wrap'>
                    <h2>To do list</h2>
                </div>
            </header>

            <nav>
                <div className='nav_wrap'>
                    <Link to='/'>홈</Link>
                    {token ? (
                        <>
                            <Link to='/' onClick={handleLogout}>로그아웃</Link>
                            <Link to='/modify'>정보수정</Link>
                            <Link to='/delete'>계정삭제</Link>
                            <Link to='/posts'>게시물</Link>
                        </>
                    ) : (
                        <>
                            <Link to='/signup'>회원가입</Link>
                            <Link to='/signin'>로그인</Link>
                        </>
                    )}
                </div>
            </nav>

            <footer>
                <div className='footer_wrap'>
                    copyright
                </div>
            </footer>
        </div>
    );
};

export default HeaderNavFooter;
