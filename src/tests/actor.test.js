const request = require('supertest')
const app = require('../app')

let id;

test('GET/ actors will return all actors', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/ actors should rotate the created elements', async () => {
    const body = {
        firstName: "Leonardo",
        lastName: "DiCaprio",
        nationality: "Estadounidense",
        image: "url",
        birthday: "1974-11-11"
    }
    const res = await request(app).post('/actors').send(body);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('PUT/ actors/:id will modify the actors by their id', async () => {
    const body = {
        firstName: "Leonardo actualizado"
    }
    const res = await request(app).put(`/actors/${id}`).send(body)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test('DELETE/ actors/:id is going to eliminate the actors by their id', async () => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204);
});