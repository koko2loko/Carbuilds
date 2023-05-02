import UsersDAO from '../dao/usersDAO.js'

export default class UsersController {
    static async apiCreateUser(req, res, next) {
        try {
            const email = req.body.email
            const username = req.body.username
            const password = req.body.password

            const UserResponse = await UsersDAO.createUser(
                email, username, password, next
            )
            console.log(UserResponse)
            if (UserResponse.error) {
                res.status(UserResponse.error.code).json(UserResponse.error)
            } else {
                res.json(UserResponse)
            }
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
    static async apiGetUsers(req, res, next) {
        try {
            const { usersList, totalUsers } = await UsersDAO.getUsers()
            let response = { usersList, totalUsers }
            res.json(response)
        } catch (error) {
            console.error(`Error while getting users: ${error}`)
            res.status(500).json({ error: "Internal Server Error" })
        }
    }
    static async apiLoginUser(req, res, next) {
        const username = req.body.username
        const password = req.body.password
        const userData = await UsersDAO.loginUser(username, password)
        if (userData.error) {
            res.status(userData.error.code).json(userData.error)
        } else {
            res.json(userData)
        }
    }

    static async apiGetUserById(req, res, next) {
        const userData = await UsersDAO.getUserById(req.params.id)
        res.json(userData)
    }
    static async apiUpdateProfile(req, res, next) {
        const { about, twitter, instagram, youtube } = req.body
        const userData = await UsersDAO.updateProfile(req.params.id, about, twitter, instagram, youtube)
        res.json(userData)
    }
    static async apiFollowUser(req, res, next) {
        try {
            const { id: userId } = req.params;
            const { followUserId } = req.body;

            const result = await UsersDAO.followUser(userId, followUserId);

            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    static async apiUnfollowUser(req, res, next) {
        try {
            const { id: userId } = req.params;
            const { unfollowUserId } = req.body;

            const result = await UsersDAO.unfollowUser(userId, unfollowUserId);

            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}