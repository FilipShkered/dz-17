class TodoApi {
    static API = 'https://642ffaafc26d69edc88806d4.mockapi.io/api/todo'

    static getList() {
        return fetch(TodoApi.API)
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }

                throw new Error('Can not retrive todo list from server');
            })
    }

    static create(todo) {
        return fetch(TodoApi.API, {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: {
                    'Content-type': 'application/json',
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }

                throw new Error('Can not create todo on server');
            })
    }

    static delete(id) {
        return fetch(`${TodoApi.API}/${id}`, {
                method: 'DELETE',
            })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }

                throw new Error('Can not delete todo from server');
            })
    }

    static update(id, data) {
        return fetch(`${TodoApi.API}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('Failed to update todo item on server');
            });
    }
}