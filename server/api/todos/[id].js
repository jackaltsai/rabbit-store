export default eventHandler(async (event) => {
  try {
    // 確認 ID 是否存在於參數中
    const { id } = event.context.params;
    if (!id) {
      throw new Error('Missing ID to delete todo');
    }

    // 初始化資料庫
    const db = hubDatabase();

    // 準備刪除 SQL 語句
    const statement = db.prepare('DELETE FROM todos WHERE id = ?');
    
    // 執行刪除
    const result = await statement.bind(id).run();

    // 檢查刪除結果
    if (result.changes === 0) {
      throw new Error(`Todo with ID ${id} not found.`);
    }

    // 可選：回傳刪除成功訊息
    return { message: `Todo with ID ${id} deleted successfully.` };

  } catch (error) {
    // 捕捉異常並回傳錯誤訊息
    return { error: error.message };
  }
});
