const request = require('supertest')
const app = require('../app')

let id;

test('GET/ directors will return all directors', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/ directors should rotate the created elements', async () => {
    const body = {
        firstName: "Martin",
        lastName: "Scorsese",
        nationality: "Estadounidense",
        image: "url",
        birthday: "1942-11-17"
    }
    const res = await request(app).post('/directors').send(body);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('PUT/ directors/:id will modify the directors by their id', async () => {
    const body = {
        firstName: "Martin actualizado"
    }
    const res = await request(app).put(`/directors/${id}`).send(body)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('DELETE/ directors/:id is going to eliminate the directors by their id', async () => {
    const res = await request(app).delete(`/directors/${id}`)
    expect(res.status).toBe(204);
});