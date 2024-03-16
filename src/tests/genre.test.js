const request = require('supertest')
const app = require('../app')

let id;

test('GET/ genres will return all genres', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/ genres should rotate the created elements', async () => {
    const body = {
        name: "Acción"
    }
    const res = await request(app).post('/genres').send(body);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('PUT/ genres/:id will modify the genres by their id', async () => {
    const body = {
        name: "Fantasía"
    }
    const res = await request(app).put(`/genres/${id}`).send(body)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('DELETE/ genres/:id is going to eliminate the genres by their id', async () => {
    const res = await request(app).delete(`/genres/${id}`)
    expect(res.status).toBe(204);
});