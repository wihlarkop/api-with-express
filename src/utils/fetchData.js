import axios from "axios";

const todoList = async function (user_id) {
    let todos = []

    if (user_id) {
        await axios.get(`${process.env.BASE_URL}/todos?userId=${user_id}`)
            .then(result => {
                let todo = result.data

                for (let us in todo) {
                    const row = todo[us]
                    todos.push({
                        "id": row.id,
                        "title": row.title,
                        "status": row.completed,
                    })
                }
            })
    }
    return todos;
}

const userData = async function (user_id) {
    let data = []

    if (user_id) {
        await axios.get(`${process.env.BASE_URL}/users/${user_id}`)
            .then(async result => {
                let user = result.data

                data.push({
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "name": user.name,
                    "phone": user.phone,
                    "address": (`${user.address.street}, ${user.address.city}`),
                    "company": user.company.name,
                    "todos": await todoList(user_id)
                })
            })
    } else {
        await axios.get(`${process.env.BASE_URL}/users`)
            .then(async result => {

                for (let us in result.data) {
                    const row = result.data[us]
                    data.push({
                        "id": row.id,
                        "username": row.username,
                        "email": row.email,
                        "name": row.name,
                        "phone": row.phone,
                        "address": (`${row.address.street}, ${row.address.city}`),
                        "company": row.company.name
                    })
                }
            })
    }
    return data
}


export {todoList, userData};
