var knex = require('./knex')

module.exports = {
  signIn: function(body) {
    return knex('my_user').where({agentName: body.agentId}).returning('password')
  },
  signUp: function(body, hash) {
    return knex('my_user').where({agentName: body.agentName})
    .then(user => user.length > 0 ? null: knex('my_user').insert({agentName:body.agentName, password: hash}).returning('*'))
  }
}
