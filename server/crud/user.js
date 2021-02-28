
const { getSignedTokenForUser } = require('../utils/user')

const getScopesForUser = async (user, client) => {
    const result = await client.query("select scope from user_scopes where user_id = $1::uuid", [user.user_id])
    return result.rows.map(r => r.scope)
}

const getUserByLoginToken = async (token, client) => {
    const result = await client.query("select * from logintokens lt inner join tickets t on t.id = lt.ticket_id inner join users u on u.id = lt.user_id where token = $1::text and used = false", [token])
    if (result.rows.length !== 1) {
        throw "Not found"
    }

    const scopes = await getScopesForUser(result.rows[0], client)
    const jwtToken = getSignedTokenForUser(result.rows[0], scopes)
    return jwtToken
}

const blockUser = async (client, userId, chattable) => {
    if (chattable == "false") {
        await client.query("update chat_message set visible = false where user_id = $1::uuid", [userId])
    }
    const result = await client.query("update users set chattable = $2::boolean where id = $1::uuid", [userId, chattable])
    return result.rowCount === 1
}

module.exports = {
    getUserByLoginToken: getUserByLoginToken,
    blockUser
}