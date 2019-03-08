const request = require('supertest');

const server = require('./index.js');
const db = require('./data/dbConfig');

describe('index.js testing', () => {
    beforeEach(async () => {
        await db('games').truncate();
    })
    describe('GET /games', () => {
        test('should return 200 OK', async () => {
            const res = await request(server).get('/games');
            expect(res.status).toBe(200);
        })
        test('should return json', async () => {
            const res = await request(server).get('/games');
            expect(res.type).toBe('application/json');
        })
        test('should return empty array if no content', async () => {
            const res = await request(server).get('/games');
            expect(JSON.parse(res.text)).toHaveLength(0);
        })
    })
    describe('POST /games', () => {
        test('should return the item added if success', async () => {
            const game = {
                name: "Smash",
                genre: "fighting game"
            }
            const result = await request(server).post('/games')
            .send(game)
            .set('Accept', 'application/json')
            .expect(201, { 
                id: 1,
                name: 'Smash',
                genre: 'fighting game',
                releaseYear: null }
          )
        })
        test('should return 422 if incomplete data provided', async () => {
            const game = {
                name: "Smash"
            }
            const result = await request(server).post('/games')
            .send(game)
            .expect(422)
        })
        test('should return 422 if no data provided', async () => {
            const result = await request(server).post('/games')
            .expect(422)
        })
    })
})