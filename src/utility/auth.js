export function saveUser(userData) {
    localStorage.setItem('userData', JSON.stringify(userData))
}

export function getUser() {
    return JSON.parse(localStorage.getItem('userData'))
}

export function login() {
    localStorage.setItem('isLogged', 'true')
}

export function logout() {
    localStorage.setItem('isLogged', 'false')
}

export function getIsLogged() {
    return JSON.parse(localStorage.getItem('isLogged'))
}