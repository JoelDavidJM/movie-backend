const request = require('supertest')
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');

let id;

test('GET/ movies will return all movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/ movies should rotate the created elements', async () => {
    const body = {
        name: "Doraemon: Stand by Me",
        image: "url",
        synopsis: "Es una película de animación japonesa que sigue las aventuras de Nobita Nobi, un niño con problemas en la escuela y en su vida cotidiana. Con la ayuda de un gato-robot del futuro llamado Doraemon, Nobita y sus amigos descubren un árbol mágico que les permite ver sus futuros yo. A través de esta experiencia, Nobita aprende lecciones valiosas sobre la importancia de la amistad, la responsabilidad y la confianza en uno mismo.",
        releaseYear: 2014,
    }
    const res = await request(app).post('/movies').send(body);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('PUT/ movies/:id will modify the movies by their id', async () => {
    const body = {
        name: "Martin actualizado"
    }
    const res = await request(app).put(`/movies/${id}`).send(body)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('POST /movies/:id/actors must insert the values of actors in movie by their id', async () => {
    const actor = await Actor.create({
        firstName: "Leonardo",
        lastName: "DiCaprio",
        nationality: "Estadounidense",
        image: "url",
        birthday: "1974-11-11"
    })
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id])
    await actor.destroy()
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe("Leonardo");
});

test('POST /movies/:id/directors must insert the values of directors in movie by their id', async () => {
    const directores = await Director.create({
        firstName: "Martin",
        lastName: "Scorsese",
        nationality: "Estadounidense",
        image: "url",
        birthday: "1942-11-17"
    })
    const res = await request(app).post(`/movies/${id}/directors`).send([directores.id])
    await directores.destroy()
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe("Martin");
});

test('POST /movies/:id/genres must insert the values of genres in movie by their id', async () => {
    const genres = await Genre.create({
        name: "Acción"
    })
    const res = await request(app).post(`/movies/${id}/genres`).send([genres.id])
    await genres.destroy()
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Acción");
});

test('DELETE/ movies/:id is going to eliminate the movies by their id', async () => {
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204);
});