module.exports = async function(db, StudentValue){

//o codigo desse arquivo serve para inserir alguem no bd

    const insertStudent = await db.run(`
        INSERT INTO students(
            name,
            password,
            serie,
            score,
            time,
            date
        )VALUES(
            "${StudentValue.name}",
            "${StudentValue.password}",
            "${StudentValue.serie}",
            "${StudentValue.score}",
            "${StudentValue.time}",
            "${StudentValue.date}"
        )
    `)

    //await Promise.all(insertStudent)
}







