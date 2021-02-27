

const insertMessage = async (jwtUser, message, client) => {
    const result = await client.query("insert into chat_message (user_id, message) values ($1::uuid, $2::text)", [jwtUser.userId, message])
    return result.rowCount === 1
}

const getMessages = async (client) => {
    const result = await client.query("select * from chat_message")
    return result.rows
}

module.exports = {
    insertMessage,
    getMessages
}