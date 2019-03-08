const db = require('./dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(game) {
  const [id] = await db('games').insert(game);

  return db('games')
    .where({ id })
    .first();
}

async function update(id, changes) {
  await db('games').update(changes).where('id', id)
  return changes;
}

async function remove(id) {
  let find = await findById(id)
  console.log(find)
  if (find.length !== 0) {
    await db('games').delete().where('id',id)
    return id;
  } else {
    return 0
  }
}

function getAll() {
  return db('games');
}

function findById(id) {
  return db('games').where('id',id);
}
