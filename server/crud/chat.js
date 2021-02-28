

const insertMessage = async (jwtUser, message, client) => {

    const isChattable = await client.query("select chattable from users where id = $1::uuid", [jwtUser.userId]).then(r => r.rows[0].chattable)

    if (isChattable) {
        const result = await client.query("insert into chat_message (user_id, message) values ($1::uuid, $2::text) returning *", [jwtUser.userId, message])
        return { status: result.rows.length === 1, error: null, id: result.rows[0].id }
    } else {
        return {
            status: false, error: 'Blocked'
        }
    }
}

const chatDefaultQuery = "select cm.id, cm.user_id, cm.sent_time, cm.message, u.display_name, case when cm.user_id = $2::uuid then 'outgoing' else 'ingoing' end as type from chat_message cm inner join users u on u.id = cm.user_id WHERE cm.visible = true "

const getMessages = async (client) => {

    const result = await client.query(chatDefaultQuery + " order by cm.sent_time desc LIMIT 200")
    return result.rows
}

const getMessagesBefore = async (client, before, jwtUser) => {
    const result = await client.query(chatDefaultQuery + " AND sent_time < $1::timestamp order by sent_time asc LIMIT 200", [before, jwtUser.userId])
    return result.rows
}

const getChatById = async (client, id, userId) => {
    const result = await client.query(chatDefaultQuery + " and cm.id = $1::uuid", [id, userId])
    return result.rows[0]
}

const getMessagesAfter = async (client, time) => {
    const result = await client.query(chatDefaultQuery + " AND sent_time > $1::timestamp order by sent_time asc limit 200", [time])
    return result.rows
}

const hideMessage = async (client, chatId) => {
    const result = await client.query("update chat_message set visible = false where id = $1::uuid", [chatId])
    return result.rowCount === 1
}

module.exports = {
    insertMessage,
    getMessages,
    getMessagesBefore,
    getMessagesAfter,
    hideMessage,
    getChatById
}