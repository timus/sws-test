## Description

Api End point: http://localhost:4000/companies

You can add search parameter as a query string

Eg: http://localhost:4000/companies?sort=volatility&sortDirection=DESC

API are cached and cache gets invalidated every 24 hours

Unit tests of only critical paths are covered

Used out-of-the-box design patterns from NestJS

I have offloaded volatility calculation to a separate Docker worker container and they are scheduled to run every 24 hours

## Installation

```bash
rename env.example to .env
docker-compose up

and then from docker cli
npx sequelize-cli db:seed:all
```
## Tests

 npm run test

# test coverage
 npm run test:cov
 
 #notes
 In this task, I used a 30-day dataset to calculate volatility because there wasn't enough data to do the same for 90 days.
 
 In the real world, I would isolate the worker from the scheduler from the current repository and rather put it on EventBridge and then trigger a Lambda to compute the volatility of the company. If we have a Kubernetes ecosystem, spinning up the container with some scaled job will also be a good idea, but it depends on how much time it will take to calculate volatility and how many days we are considering.
