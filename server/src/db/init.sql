-- ============================================
-- Paritet Bank — Database Schema
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Таблица: currency_rates
-- ============================================
CREATE TABLE IF NOT EXISTS currency_rates (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tab          VARCHAR(20) NOT NULL CHECK (tab IN ('iparitet', 'cash', 'cards', 'nbrb')),
  code         VARCHAR(10) NOT NULL,
  name         VARCHAR(50) NOT NULL,
  icon         VARCHAR(10) NOT NULL,
  buy          NUMERIC(10, 4),
  sell         NUMERIC(10, 4),
  rate         NUMERIC(10, 4),          -- отображаемый курс (за N единиц, как на сайте)
  rate_per_unit NUMERIC(12, 6),         -- курс за 1 единицу (для конвертации)
  change       VARCHAR(10) CHECK (change IN ('up', 'down', 'neutral')),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_currency_rates_tab ON currency_rates(tab);
CREATE INDEX IF NOT EXISTS idx_currency_rates_updated ON currency_rates(updated_at DESC);

-- ============================================
-- Таблица: chat_messages
-- ============================================
CREATE TABLE IF NOT EXISTS chat_messages (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id VARCHAR(100) NOT NULL,
  role       VARCHAR(10) NOT NULL CHECK (role IN ('user', 'assistant')),
  content    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_session ON chat_messages(session_id, created_at);

-- ============================================
-- Таблица: exchange_log
-- ============================================
CREATE TABLE IF NOT EXISTS exchange_log (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_currency VARCHAR(10) NOT NULL,
  to_currency   VARCHAR(10) NOT NULL,
  amount        NUMERIC(15, 4) NOT NULL,
  result        NUMERIC(15, 4) NOT NULL,
  rate          NUMERIC(15, 6) NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- Seed: курсы валют
--
-- rate         — отображаемый курс (за N единиц, как на сайте банка)
-- rate_per_unit — курс за 1 единицу (используется для конвертации)
--
-- Пример RUB:
--   name = '100 RUB', rate = 3.6056 (за 100 руб)
--   rate_per_unit = 0.036056 (за 1 руб)
-- ============================================

INSERT INTO currency_rates (tab, code, name, icon, buy, sell, rate_per_unit, change) VALUES
  -- iparitet
  ('iparitet', 'USD',     '1 USD',     '$',  2.97,   3.045,  NULL, NULL),
  ('iparitet', 'EUR',     '1 EUR',     '€',  3.445,  3.55,   NULL, NULL),
  ('iparitet', 'RUB',     '100 RUB',   '₽',  3.577,  3.65,   NULL, 'up'),
  ('iparitet', 'EUR/USD', 'EUR / USD', '€',  1.134,  1.1878, NULL, NULL),
  ('iparitet', 'EUR/RUB', 'EUR / RUB', '€',  94,     98.6,   NULL, NULL),
  ('iparitet', 'USD/RUB', 'USD / RUB', '$',  80.5,   85.1,   NULL, NULL),

  -- cash
  ('cash', 'USD', '1 USD',   '$',  2.98,  3.025, NULL, 'up'),
  ('cash', 'EUR', '1 EUR',   '€',  3.46,  3.51,  NULL, 'up'),
  ('cash', 'RUB', '100 RUB', '₽',  3.597, 3.63,  NULL, 'down'),
  ('cash', 'PLN', '10 PLN',  'zł', 7.9,   8.2,   NULL, NULL),
  ('cash', 'CNY', '10 CNY',  '¥',  4.4,   4.6,   NULL, NULL),

  -- cards
  ('cards', 'USD', '1 USD',   '$', 2.945, 3.1,   NULL, NULL),
  ('cards', 'EUR', '1 EUR',   '€', 3.405, 3.585, NULL, NULL),
  ('cards', 'RUB', '100 RUB', '₽', 3.48,  3.76,  NULL, NULL)

ON CONFLICT DO NOTHING;

-- НБРБ: rate = отображаемый (за N единиц), rate_per_unit = за 1 единицу
INSERT INTO currency_rates (tab, code, name, icon, rate, rate_per_unit, change) VALUES
  ('nbrb', 'USD', '1 USD',   '$', 3.0184, 3.018400, 'up'),
  ('nbrb', 'EUR', '1 EUR',   '€', 3.4652, 3.465200, 'up'),
  ('nbrb', 'RUB', '100 RUB', '₽', 3.6056, 0.036056, 'down')  -- rate_per_unit = rate/100
ON CONFLICT DO NOTHING;
