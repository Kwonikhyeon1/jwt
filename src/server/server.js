let http = require('http');
let url = require('url');
let mysql = require('mysql2');
const compression = require('compression');
let express = require('express');
const db = require('./db/mysql.js');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt'); // 비밀번호 해싱을 위한 라이브러리

// // session setting
// const maxAge = 1000 * 60 * 30;
// const loginedSessionID = {
//     secret: '1234',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         domain: 'localhost',
//         maxAge: maxAge,
//         sameSite: 'none',
//         secure: true,
//     }
// }

// JWT
const secret_key = process.env.jwt_secret || '1234';

const app = express();
const PORT = 5000;


app.use(cors({
    origin: 'http://localhost:3000', // 허용할 도메인
    methods: ['POST', 'GET', 'OPTIONS'], // 허용할 메서드
    allowedHeaders: ['Content-Type', 'Authorization', 'withCredentials'], // 올바른 허용 헤더 설정
    credentials: true // 쿠키 허용
}));

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(session(loginedSessionID)); // 세션 사용 안 함

// 서버 생성
app.get('/', (req, res) => {
    res.send('Welcome to the Todo List API!'); // 간단한 응답
});


// 회원가입 확인
app.post('/signup_confirm', async (req, res) => {
    let postData = req.body;

    // 비밀번호 해싱
    let hashedPassword = await bcrypt.hash(postData.m_pw, 10);
    db.query(
        'INSERT INTO TBL_MEMBER(m_id, m_pw, m_mail, m_phone) VALUES (?, ?, ?, ?)',
        [postData.m_id, hashedPassword, postData.m_mail, postData.m_phone],
        (error, result) => {
            if (error) {
                console.error("Error:", error);
                return res.status(500).json({ message: 'Signup failed!' });
            }
            res.status(200).json({ message: 'Signup successful!' });
        }
    );
});

// 로그인 확인
app.post('/signin_confirm', async (req, res) => {
    let postData = req.body;
    console.log("signIn()");

    let hashedPassword = await bcrypt.hash(postData.m_pw, 10);

    db.query(
        'SELECT * FROM TBL_MEMBER WHERE m_id = ?',
        [postData.m_id, postData.m_pw],
        async (error, result) => {
            if (error) {
                console.error("Error:", error);
                return res.status(500).json({ message: 'Login failed!' });
            }

            if (result.length > 0) {
                // 비밀번호 비교
                const user = result[0];
                console.log(result[0]);
                console.log(hashedPassword);
                const isMatch = await bcrypt.compare(postData.m_pw, hashedPassword);

                if (isMatch) {
                    const token = jwt.sign({ id: user.m_id }, secret_key, { expiresIn: '1h' });
                    console.log("token-->", token);
                    return res.status(200).json({ token });
                } else {
                    return res.status(401).json({ message: 'Invalid credentials!' });
                }
            } else {
                return res.status(401).json({ message: 'Invalid credentials!' });
            }
        }
    );
});

// 서버 포트번호 설정
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
