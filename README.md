# react-node-template

## Install

```
    // 1st tab
    // root folder
    docker-compsoe up

    // 2nd tab
    cd src/server
    npm ci
    cd src
    npx knex migrate:latest
    npm start

    // 3rd tab
    cd src/client
    npm ci
    npm start

```

### Create new migration

```
    cd src/server/src
    npx knex migrate:make create_users_table
    npx knex migrate:latest
```

### Seed

```
    cd src/server/src
    npx knex seed:make 01-users
    npx knex seed:run
```
