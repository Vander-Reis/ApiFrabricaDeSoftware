exports.up = knex => knex.schema.createTable("createSubjects", table => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("description").notNullable();
    table.integer("user_id").references("id").inTable("users");
});

exports.down = knex => knex.schema.dropTable("createSubjects");