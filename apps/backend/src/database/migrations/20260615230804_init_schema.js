/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  // 1. Магазини
  await knex.schema.createTable('stores', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable().unique();
    table.string('base_url', 255).notNullable();
    table.string('logo_url', 255).nullable();
    table.boolean('is_active').defaultTo(true).notNullable();
    table.timestamps(true, true);
  });

  // 2. Категорії
  await knex.schema.createTable('categories', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.string('slug', 100).notNullable().unique();
    table.integer('parent_id').unsigned().nullable()
      .references('id').inTable('categories').onDelete('CASCADE');
    table.string('icon_url', 255).nullable();
    table.timestamps(true, true);
  });

  // 3. Фільтри (для автоматичної генерації сайдбару)
  await knex.schema.createTable('attribute_definitions', (table) => {
    table.increments('id').primary();
    table.integer('category_id').unsigned().notNullable()
      .references('id').inTable('categories').onDelete('CASCADE');
    table.string('key', 50).notNullable();
    table.string('label', 100).notNullable();
    table.enum('filter_type', ['select', 'range', 'boolean']).notNullable();
    table.string('unit', 20).nullable();
    table.timestamps(true, true);
    table.unique(['category_id', 'key']);
  });

  // 4. Товари (Highload оптимізація через JSONB)
  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.integer('category_id').unsigned().notNullable()
      .references('id').inTable('categories').onDelete('RESTRICT');
    table.string('name', 255).notNullable();
    table.string('slug', 255).notNullable().unique();
    table.string('image_url', 255).nullable();
    table.jsonb('attributes').defaultTo('{}').notNullable(); // Динамічні характеристики
    table.decimal('min_price', 12, 2).nullable();            // Кеш найнижчої ціни
    table.timestamps(true, true);

    table.index(['category_id']);
    table.index(['min_price']);
  });

  // Швидкісний GIN-індекс для пошуку по JSONB
  await knex.raw('CREATE INDEX idx_products_attributes ON products USING GIN (attributes);');

  // 5. Пропозиції (від парсера)
  await knex.schema.createTable('offers', (table) => {
    table.increments('id').primary();
    table.integer('product_id').unsigned().notNullable()
      .references('id').inTable('products').onDelete('CASCADE');
    table.integer('store_id').unsigned().notNullable()
      .references('id').inTable('stores').onDelete('CASCADE');
    table.decimal('price', 12, 2).notNullable();
    table.string('buy_url', 512).notNullable();
    table.boolean('in_stock').defaultTo(true).notNullable();
    table.timestamp('scraped_at').defaultTo(knex.fn.now()).notNullable();
    table.timestamps(true, true);

    table.unique(['product_id', 'store_id']);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('offers');
  await knex.schema.dropTableIfExists('products');
  await knex.schema.dropTableIfExists('attribute_definitions');
  await knex.schema.dropTableIfExists('categories');
  await knex.schema.dropTableIfExists('stores');
}