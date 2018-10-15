--drop table closest_stop_request;
REM CREATE closest_stop_request table for storing getClosestStop requests and responses
CREATE TABLE closest_stop_request (
  id          SERIAL PRIMARY KEY,
  request     JSON,
  response    JSON,
  created_at  BIGINT DEFAULT EXTRACT(EPOCH FROM current_timestamp) * 1000
);
