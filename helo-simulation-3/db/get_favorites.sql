SELECT helo_posts.favorite_band, helo_users.username, helo_posts.id FROM helo_posts
INNER JOIN helo_users ON helo_posts.creator_id = helo_users.id