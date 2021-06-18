import axios from "axios";

const todosListByUser = async function (user_id) {
    let todos = []

    await axios.get(`${process.env.BASE_URL}/todos?userId=${user_id}`)
        .then(result => {
            let todo = result.data

            if (todo) {
                for (let us in todo) {
                    const data = todo[us]

                    todos.push({
                        "id": data.id,
                        "title": data.title,
                        "status": data.completed,
                    })
                }
            } else {
                todos = []
            }

        })
    return todos;
}

const commentsListByPostUser = async function (post_id) {
    let comments = []

    await axios.get(`${process.env.BASE_URL}/comments?postId=${post_id}`)
        .then(result => {
            let comment = result.data

            if (comment) {
                for (let cmt in comment) {
                    const data = comment[cmt]

                    comments.push({
                        "id": data.id,
                        "name": data.title,
                        "email": data.email,
                        "body": data.body,
                    })
                }
            } else {
                comments = []
            }
        })
    return comments;
}

const postsListByUser = async function (user_id) {
    let posts = []

    await axios.get(`${process.env.BASE_URL}/posts?userId=${user_id}`)
        .then(async result => {
            let post = result.data

            if (post) {
                for (let pst in post) {
                    const data = post[pst]

                    posts.push({
                        "id": data.id,
                        "title": data.title,
                        "body": data.body,
                        "comments": await commentListByPostUser(data.id)
                    })
                }
            } else {
                posts = []
            }
        })
    return posts;
}

const photosListByAlbumUser = async function (album_id) {
    let photos = []

    await axios.get(`${process.env.BASE_URL}/photos?albumId=${album_id}`)
        .then(async result => {
            let photo = result.data

            if (photo) {
                for (let pst in photo) {
                    const data = photo[pst]

                    photos.push({
                        "id": data.id,
                        "title": data.title,
                        "url": data.url,
                        "thumbnailUrl": data.thumbnailUrl,
                    })
                }
            } else {
                photos = []
            }
        })
    return photos;
}

const albumsListByUser = async function (user_id) {
    let albums = []
    await axios.get(`${process.env.BASE_URL}/albums?userId=${user_id}`)
        .then(async result => {
            let album = result.data

            if (album) {
                for (let pst in album) {
                    const data = album[pst]

                    albums.push({
                        "id": data.id,
                        "title": data.title,
                        "photos": await photosListByAlbumUser(data.id)
                    })
                }
            } else {
                albums = []
            }
        })
    return albums;
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
                    // "todos": await todoListByUser(user_id),
                    // "posts": await postsListByUser(user_id)
                    // "albums": await albumsListByUser(user_id)
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


export {userData, todosListByUser, postsListByUser, commentsListByPostUser, albumsListByUser, photosListByAlbumUser};
