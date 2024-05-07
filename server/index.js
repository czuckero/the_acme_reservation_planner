const { 
  client,
  createTables,
  createCustomer,
  createRestaurant,
  fetchCustomers,
  fetchRestaurants,
  createReservation,
  destroyReservation
} = require('./db');

const express = require('express');
const app = express();

const init = async () => {
  await client.connect();
  console.log('connected to database');

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));

  await createTables();
  console.log('created tables');

  const [gary, william, buddie, mcdonalds, alinea, san_morello]
  = await Promise.all([
    createCustomer({name: 'gary'}),
    createCustomer({name: 'william'}),
    createCustomer({name: 'buddie'}),
    createRestaurant({name: "McDonald's"}),
    createRestaurant({name: 'Alinea'}),
    createRestaurant({name: 'San Morello'})
  ]);
  console.log("data seeded");

  console.log(await fetchCustomers());
  console.log(await fetchRestaurants());

  const [reservation1, reservation2, reservation3]
  = await Promise.all([
    createReservation({
      customer_id: gary.id,
      restaurant_id: san_morello.id,
      party_count: 3,
      date: "11/11/2024"
    }),
    createReservation({
      customer_id: gary.id,
      restaurant_id: alinea.id,
      party_count: 5,
      date: "12/12/2024"
    }),
    createReservation({
      customer_id: william.id,
      restaurant_id: alinea.id,
      party_count: 2,
      date: "06/13/2024"
    })
  ]);

  
};

init();