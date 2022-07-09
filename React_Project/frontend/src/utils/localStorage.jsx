export const saveData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const deleteData = (key) => {
    localStorage.removeItem(key)
}