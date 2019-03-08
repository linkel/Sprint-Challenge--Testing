const db = require('./dbConfig.js');
const Games = require('./gamesModel.js');

describe('games model', () => {
  beforeEach(async () => {
    await db('games').truncate();
  })
  describe('get games', () => {
    test('should get an empty array if there are no games', async () => {
      const games = await Games.getAll();
      console.log(games);
      expect(games).toHaveLength(0);
    })
    test('should get one thing back if db has 1 thing', async () => {
      const add = await Games.insert({name : "Warframe", genre: "3rd Person Shooter"})
      const games = await Games.getAll();
      console.log(games);
      expect(games).toHaveLength(1);
    })
  })
});
