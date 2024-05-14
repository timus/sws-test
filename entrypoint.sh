#!/bin/sh
echo "Starting the application..."
echo "RUN_MODE: $RUN_MODE"

# Check if the RUN_MODE is set to HTTP
if [ "$RUN_MODE" = "HTTP" ]; then
  echo "Running in HTTP mode; executing migrations..."
  sequelize db:migrate || echo "Failed to run migrations"
else
  echo "Not running in HTTP mode, skipping migrations."
fi

echo "Starting the server..."
exec npm run start
