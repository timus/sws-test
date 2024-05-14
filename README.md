
## Description

Api End point: http://localhost:4000/companies

You can add search paramater as a query string

Eg: http://localhost:4000/companies?sort=volatility&sortDirection=DESC

API are cached and cache get invalidated at every 24 hours

Unit test of only critcal path are covered 

Used out of the box design pattern  from nest js

I have ofloaded volatility calculation to seperate docker worker container and they are schduled to run at evey 24 hours 

## Installation

```bash
rename env.example to .env
docker-compose up
and the from docker cli 
npx sequelize-cli db:seed:all

```

## Test

```bash
# unit tests
$ npm run test


# test coverage
$ npm run test:cov
```

##Notes

In this task I used 30 days data set to calculate volatility because there were no enough data to do same for 90 days 

In the real world I would  isolate the worker from the  scheduler from the current repositopry and rather put it on event bridge and then trigger a lambda to compute the voaltility of the company . If we have k8s ecosystem spinning up the container with some scaled job will also be a good idea but it depend on how much time will it take to calculate volatility and how many days we are considering# swsTest

