export default eventHandler(async (event) => {
    const db = hubDatabase()
  
    await db.exec('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, name TEXT, completed INTEGER, created_at INTEGER)')
  
    // List todos
    const { results: todos } = await db.prepare('SELECT * FROM todos ORDER BY created_at DESC').all()
  
    return todos
  })