export default eventHandler(async (event) => {
    const { todo } = await readBody(event)
    const db = hubDatabase()
  
    await db
      .prepare('INSERT INTO todos (name, created_at) VALUES (?1, ?2)')
      .bind(todo.name, Date.now())
      .run()
  
    return {}
  })