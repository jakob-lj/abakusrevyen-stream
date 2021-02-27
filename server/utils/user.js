
const jwt = require('jsonwebtoken');

const getSignedTokenForUser = (user, scopes) => {
    console.log(user)
    return jwt.sign({ userId: user.user_id, scopes }, process.env.JWT_SECRET)
}

const getUserDetailsByRequest = async (req) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        return jwt.decode(token, process.env.JWT_SECRET)

    } catch (err) {
        return null
    }
}

module.exports = {
    getSignedTokenForUser: getSignedTokenForUser,
    getUserDetailsByRequest: getUserDetailsByRequest
}