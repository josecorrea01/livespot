CREATE TABLE IF NOT EXISTS events (
  id VARCHAR(20) PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  category VARCHAR(80) NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  host VARCHAR(120) NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  price VARCHAR(40) NOT NULL,
  status VARCHAR(40) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  event_id VARCHAR(20) NOT NULL UNIQUE REFERENCES events(id) ON DELETE CASCADE,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO events (
  id,
  title,
  category,
  event_date,
  event_time,
  host,
  image,
  description,
  price,
  status
)
VALUES
(
  '1',
  'Concierto Inmersivo Neon Nights',
  'Música',
  '2026-06-10',
  '20:00',
  'LiveSpot Originals',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
  'Experiencia en vivo con visuales, comunidad y acceso exclusivo para usuarios premium.',
  'CLP 9.990',
  'Próximo'
),
(
  '2',
  'Workshop Creator Economy',
  'Negocios',
  '2026-06-12',
  '19:30',
  'Growth Lab',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
  'Sesión práctica sobre monetización, comunidad y productos digitales para creadores.',
  'CLP 14.990',
  'Próximo'
),
(
  '3',
  'Gaming Arena Live Session',
  'Gaming',
  '2026-06-14',
  '21:00',
  'Arena Hub',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
  'Torneo en vivo con interacción del público, ranking y contenido exclusivo post evento.',
  'Gratis',
  'En vivo'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  category = EXCLUDED.category,
  event_date = EXCLUDED.event_date,
  event_time = EXCLUDED.event_time,
  host = EXCLUDED.host,
  image = EXCLUDED.image,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  status = EXCLUDED.status;