import { storageService } from "../services/async-storage.service"
import { utilService } from "../services/util.service"

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'


export const userService = {
    getUser,
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getById,
    getEmptyCredentials,
    updateUser
}
_createUser()

async function updateUser(transaction) {
    const userId = getLoggedinUser()._id
    let userFromData = await storageService.get('users', userId)
    userFromData.transactions.push(transaction)
    userFromData.balance -= transaction.amount
    const userToUpdate = { ...userFromData }
    await storageService.put('users', userToUpdate)
    if (getLoggedinUser()._id === userToUpdate._id) saveLocalUser(userToUpdate)
    return userToUpdate
}

function _createUser() {
    let users = storageService.oldGet('users')
    if (!users) {
        users = [
            {
                _id: utilService.makeId(),
                fullname: "Tal Ben David",
                username: "tabad",
                balance: 100,
                password: 123,
                transactions: []
            },
            {
                _id: utilService.makeId(),
                fullname: "Ofek Ben David",
                username: "tabad",
                balance: 100,
                password: 1234,
                transactions: []
            },
        ]
        storageService.oldSave('users', users)
    }
}

function getEmptyCredentials() {
    return {
        username: "",
        password: "",
        fullname: "",
    }
}

function getUser() {
    const user = {
        name: "Tal Ben David",
        balance: 100,
        transactions: []
    }
    return user
}

async function getById(userId) {
    const user = await storageService.get('users', userId)
    return user
}

async function login(userCred) {
    const users = await storageService.query('users')
    const user = users.find(user => user.username === userCred.username)
    console.log(user)
    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    // if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post('users', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}


function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, balance: user.balance }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}
