
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
    } else {
        return { status: false, err: 'insert ticket failed' }
    }

}

module.exports = {
    generateTicket
}