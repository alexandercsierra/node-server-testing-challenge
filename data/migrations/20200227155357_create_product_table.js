
exports.up = function(knex) {
  return knex.schema.createTable('products', tbl=>{
      tbl.increments();
      tbl.string('name', 255).notNullable().unique().index();
      tbl.string('image').notNullable();
      tbl.float('price').notNullable();
      tbl.integer('quantity').notNullable()

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('products')
};
