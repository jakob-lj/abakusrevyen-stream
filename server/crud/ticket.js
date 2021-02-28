
const generateTicket = async (client, email, name, type, onlyChat, extraChats) => {
    const ticket = await client.query("insert into tickets (detailed_ticket) values ($1::text) returning *", [type])
    if (ticket.rows.length === 1) {
        const id = ticket.rows[0].id
        const userIds = []
        const user = await client.query("insert into users (display_name, name, email, ticket_id) values ($1::text, $1::text, $2::text, $3::uuid) returning *", [name, email, id])
        const scopes = await client.query("insert into user_scopes (user_id, scope) values ($1::uuid, $2::text)", [user.rows[0].id, "Normal"])
        userIds.push(user.rows[0].id)
        for (let i = 0; i < extraChats; i++) {
            const u = await client.query("insert into users (display_name, name, email, ticket_id) values ($1::text, $1::text, $2::text, $3::uuid) returning *", [name, email, id])
            userIds.push(u.rows[0].id)
            const scopes = await client.query("insert into user_scopes (user_id, scope) values ($1::uuid, $2::text)", [user.rows[0].id, "Chat"])
        }
        console.log(userIds)
        const tokens = []

        for (let j = 0; j < userIds.length; j++) {
            const t = generateToken()
            const update = await client.query("insert into logintokens (token, user_id, ticket_id) values ($1::text, $2::uuid, $3::uuid)", [t, userIds[j], id])
            tokens.push(t)
        }

        return { status: tokens, err: null }




    } else {
        return { status: false, err: 'insert ticket failed' }
    }
}

const generateToken = () => {
    const length = 32
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;

}

module.exports = {
    generateTicket
}