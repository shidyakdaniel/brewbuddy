-- ============================================================
-- BrewBuddy CRUD Test Script
-- Run each query one at a time in the Supabase SQL Editor.
-- ============================================================


-- ============================================================
-- BREWERIES - Full CRUD cycle
-- ============================================================

-- 1. READ: View all breweries
select * from public.breweries;

-- 2. CREATE: Insert a test brewery
insert into public.breweries (brewery_id, brewery_name, city, state, country)
values ('99900000-0000-0000-0000-000000000001', 'Test Brewery', 'Chicago', 'IL', 'USA');

-- 3. READ: Verify it was inserted
select * from public.breweries
where brewery_id = '99900000-0000-0000-0000-000000000001';

-- 4. UPDATE: Change the city
update public.breweries
set city = 'Springfield'
where brewery_id = '99900000-0000-0000-0000-000000000001';

-- 5. READ: Verify the update
select * from public.breweries
where brewery_id = '99900000-0000-0000-0000-000000000001';

-- 6. DELETE: Remove the test brewery
delete from public.breweries
where brewery_id = '99900000-0000-0000-0000-000000000001';

-- 7. READ: Verify it was deleted (should return 0 rows)
select * from public.breweries
where brewery_id = '99900000-0000-0000-0000-000000000001';


-- ============================================================
-- BEERS - Full CRUD cycle (tests FK to breweries)
-- ============================================================

-- 1. READ: View all beers with brewery name
select
  b.beer_name,
  b.style,
  b.abv,
  b.popularity_score,
  br.brewery_name
from public.beers b
join public.breweries br on b.brewery_id = br.brewery_id
order by b.popularity_score desc;

-- 2. CREATE: Insert a test beer
insert into public.beers (beer_id, brewery_id, beer_name, style, abv, popularity_score, description, image_url)
values (
  '88800000-0000-0000-0000-000000000001',
  '11100000-0000-0000-0000-000000000001',
  'Test Lager', 'Lager', 4.5, 70,
  'A crisp and clean test lager.',
  'https://example.com/images/test-lager.jpg'
);

-- 3. READ: Verify it was inserted
select * from public.beers
where beer_id = '88800000-0000-0000-0000-000000000001';

-- 4. UPDATE: Change the popularity score
update public.beers
set popularity_score = 85
where beer_id = '88800000-0000-0000-0000-000000000001';

-- 5. READ: Verify the update
select * from public.beers
where beer_id = '88800000-0000-0000-0000-000000000001';

-- 6. DELETE: Remove the test beer
delete from public.beers
where beer_id = '88800000-0000-0000-0000-000000000001';

-- 7. READ: Verify it was deleted (should return 0 rows)
select * from public.beers
where beer_id = '88800000-0000-0000-0000-000000000001';


-- ============================================================
-- RATINGS - Full CRUD cycle (tests FK to users and beers)
-- ============================================================

-- 1. READ: View all ratings with user and beer info
select
  p.first_name,
  p.last_name,
  b.beer_name,
  r.score,
  r.review_text,
  r.rated_at
from public.ratings r
join public.profiles p on r.user_id = p.user_id
join public.beers b on r.beer_id = b.beer_id
order by r.rated_at desc;

-- 2. CREATE: Add a new rating
insert into public.ratings (rating_id, user_id, beer_id, score, review_text, rated_at)
values (
  gen_random_uuid(),
  '108f03be-e0e4-4d25-9c51-422eb559335a',
  '22200000-0000-0000-0000-000000000002',
  4, 'Really solid IPA, would buy again.',
  now()
);

-- 3. READ: Verify it was inserted
select * from public.ratings
where user_id = '108f03be-e0e4-4d25-9c51-422eb559335a'
  and beer_id = '22200000-0000-0000-0000-000000000002';

-- 4. UPDATE: Change the score and review
update public.ratings
set score = 5, review_text = 'Actually one of my favorites now.'
where user_id = '108f03be-e0e4-4d25-9c51-422eb559335a'
  and beer_id = '22200000-0000-0000-0000-000000000002';

-- 5. READ: Verify the update
select * from public.ratings
where user_id = '108f03be-e0e4-4d25-9c51-422eb559335a'
  and beer_id = '22200000-0000-0000-0000-000000000002';

-- 6. DELETE: Remove the test rating
delete from public.ratings
where user_id = '108f03be-e0e4-4d25-9c51-422eb559335a'
  and beer_id = '22200000-0000-0000-0000-000000000002';

-- 7. READ: Verify it was deleted (should return 0 rows)
select * from public.ratings
where user_id = '108f03be-e0e4-4d25-9c51-422eb559335a'
  and beer_id = '22200000-0000-0000-0000-000000000002';


-- ============================================================
-- CONSTRAINT TESTS (these should all error - that is a pass)
-- ============================================================

-- TEST 1: Duplicate rating (should fail - unique constraint)
insert into public.ratings (rating_id, user_id, beer_id, score, review_text, rated_at)
values (
  gen_random_uuid(),
  'c91634d2-9605-490a-8cf5-ae428ce94e9b',
  '22200000-0000-0000-0000-000000000001',
  2, 'Trying to rate again.',
  now()
);

-- TEST 2: Duplicate favorite (should fail - unique constraint)
insert into public.favorites (favorite_id, user_id, beer_id)
values (
  gen_random_uuid(),
  'c91634d2-9605-490a-8cf5-ae428ce94e9b',
  '22200000-0000-0000-0000-000000000005'
);

-- TEST 3: Beer with non-existent brewery (should fail - FK constraint)
insert into public.beers (beer_id, brewery_id, beer_name, style, abv, popularity_score)
values (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'Ghost Beer', 'IPA', 6.0, 50
);
