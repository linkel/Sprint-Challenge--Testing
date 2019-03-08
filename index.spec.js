const request = require('supertest');

const server = require('./index.js');

describe('index.js testing', () => {
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
})