module.exports = async function(db, StudentValue){

    const insertStudent = await db.run(`
        INSERT INTO students(
            name,
            score,
            time
        )VALUES(
            "${StudentValue.name}",
            "${StudentValue.score}",
            "${StudentValue.time}"
        )
    `)

    //await Promise.all(insertStudent)
}







