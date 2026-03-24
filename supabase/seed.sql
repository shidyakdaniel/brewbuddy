insert into public.beers (id, name, style, abv) values
  (1, 'Hoppy Trails IPA', 'IPA', 6.50),
  (2, 'Golden Hour Lager', 'Lager', 5.00),
  (3, 'Midnight Stout', 'Stout', 8.20),
  (4, 'Citrus Wheat', 'Wheat', 4.70),
  (5, 'Pine Ridge Pale Ale', 'Pale Ale', 5.60)
on conflict (id) do update set
  name = excluded.name,
  style = excluded.style,
  abv = excluded.abv;

insert into public.stores (id, name, location) values
  (1, 'Downtown Bottle Shop', 'Downtown'),
  (2, 'Northside Market', 'Northside'),
  (3, 'Lakeside Liquor', 'Lakeside')
on conflict (id) do update set
  name = excluded.name,
  location = excluded.location;

insert into public.availability (beer_id, store_id, in_stock) values
  (1, 1, true),
  (1, 2, false),
  (2, 1, true),
  (3, 3, true),
  (4, 2, true)
on conflict (beer_id, store_id) do update set
  in_stock = excluded.in_stock;
