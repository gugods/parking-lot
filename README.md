# parking-lot

## Build Setup

- Install [GraphiQL] (https://github.com/graphql/graphiql) (optional)
- Install [Docker] (https://github.com/docker)

```
docker-compose up
```

## Sync Database & Migration (optional)

```
docker exec -it parking-lot bash
> yarn db-sync
> yarn migrate parking
```

## Unit test (optional)

```
docker exec -it parking-lot bash
> yarn test
```

## GraphQL Examples

#GraphQL endpoint URL http://127.0.0.1:9000

```
mutation createParkingLot($name: String!, $floor: Int!, $slots: SlotsAttribute) {
  createParkingLot(name: $name, floor: $floor, slots: $slots) {
    status
    result {
      id
      name
      floor
      slots
    }
    error {
      message
    }
  }
}
```

```
mutation parkTheCar($plateNumber: String!, $floor: Int!, $carSize: CarSizeType!) {
  parkTheCar(plateNumber: $plateNumber, floor: $floor, carSize: $carSize) {
    status
    result {
      id
      slotId
      carSize
      parkingId
      plateNumber
      parkingFloor
      parkedAt
      exitedAt
    }
    error {
      message
    }
  }
}

```

```
mutation leaveTheSlot($ticketId: ID!) {
  leaveTheSlot(ticketId: $ticketId) {
    status
    result {
      id
      slotId
      carSize
      parkingId
      plateNumber
      parkingFloor
      parkedAt
      exitedAt
    }
    error {
      message
    }
  }
}
```

```
query getStatusOfParking {
  getStatusOfParking {
    status
    result {
      id
      name
      floor
      slots
    }
    error {
      message
    }
  }
}
```

```
query getRegistrationPlateNumberByCarSize($carSize: CarSizeType!) {
  getRegistrationPlateNumberByCarSize(carSize: $carSize) {
    status
  	result {
      plateNumber
      carSize
      total
    }
    error {
      message
    }
  }
}
```

```
query getRegistrationAllocatedSlotByCarSize($carSize: CarSizeType!) {
  getRegistrationAllocatedSlotByCarSize(carSize: $carSize) {
    status
  	result {
      plateNumber
      carSize
      slotId
      parkedAt
      exitedAt
    }
    error {
      message
    }
  }
}
```

## Architecture

```
|- /src
  |- /config    - config files
  |- /scripts   - scripts that can be executed from CLI (used by `package.json`)
  |- /graphql   - GraphQL application
    |- /resolvers   - general resolvers
    |- /schemas     - general schemas
    |- /types       - general types
  |- /helpers   - general helpers
  |- /models    - general models
  |- /tests     - tests written in jest
  |- index.js   - application main file
```
