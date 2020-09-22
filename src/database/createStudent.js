module.exports = async function(db, StudentValue){

//o codigo desse arquivo serve para inserir alguem no bd

    const insertStudent = await db.run(`
        INSERT INTO students(
            name,
            password,
            score,
            time
        )VALUES(
            "${StudentValue.name}",
            "${StudentValue.password}",
            "${StudentValue.score}",
            "${StudentValue.time}"
        )
    `)

    //await Promise.all(insertStudent)
}







