let mysql = require('mysql2');

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'TODOLIST',
    port: '3306',
});


db.connect();

// MySQL 커넥션 설정
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'todolist',
    port: '3306',
});

// 연결 시도
connection.connect((error) => {
    if (error) {
        console.error('MySQL 연결 실패:', error);
    } else {
        console.log('MySQL 연결 성공');
    }
});

// 테스트 쿼리 실행
connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) {
        console.error('쿼리 실행 중 에러 발생:', error);
    } else {
        console.log('쿼리 결과:', results[0].solution); // 쿼리 결과 출력
    }

    // 커넥션 종료
    connection.end();
});

module.exports = db;
