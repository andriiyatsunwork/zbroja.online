/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // 1. Очищаємо таблиці перед засіванням (щоб не було дублів)
  await knex('offers').del();
  await knex('products').del();
  await knex('categories').del();

  // 2. Вставляємо категорію
  const [category] = await knex('categories').insert([
    { name: 'Набої', slug: 'ammo' }
  ]).returning('id');

  // 3. Вставляємо товар (використовуємо отриманий id категорії)
  await knex('products').insert([
    { 
      category_id: category.id, 
      name: 'Набій 9x19 Luger (FMJ)', 
      slug: '9x19-luger-fmj', 
      min_price: 15.50,
      attributes: JSON.stringify({ caliber: '9mm', type: 'FMJ' })
    }
  ]);
}