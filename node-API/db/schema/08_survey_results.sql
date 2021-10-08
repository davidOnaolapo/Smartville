DROP TABLE IF EXISTS survey_results CASCADE;

-- SURVEY RESULTS
CREATE TABLE survey_results (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date_completed TIMESTAMP DEFAULT NOW(),
  budget INTEGER NOT NULL 
);