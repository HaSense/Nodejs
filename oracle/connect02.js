const express = require('express')
const app = express()

const server = app.listen(5000, () => {
    console.log('server start, port 5000')
})

const oracledb = require('oracledb')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

app.get('/select', function(request, response) {
    getSelect(request, response)
})

async function getSelect(request, response) {
    let connection
    try {
        connection = await oracledb.getConnection({
            user          : "hr",
            password      : "hr",
            connectString : "127.0.0.1/xe"
        })

        const result = await connection.execute(
            `SELECT * 
            FROM emp
            WHERE empno = :num`,
            [7839], // num의 값 전달
        )

        console.log(result)
        response.send(result.rows)
    } catch (error) {
        console.log(error)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
}
