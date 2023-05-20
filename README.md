# What is this?

This is an interval implementation that allows you to set an interval and then clear it using keys instead of the interval variable reference.  
This is useful when you have to clear an interval from a different scope than the one where it was set.

## How To Install?

```bash
npm install set-interval-by-id
```

## How To Use?

```javascript
import { setIntervalById, clearIntervalById } from 'set-interval-by-id';

const intervalId = setIntervalById(() => {
  console.log('Hello World!');
}, 1000, 'myInterval'); // This will set a interval with the id 'myInterval'

// Meanwhile, in another file...
clearIntervalById('myInterval'); // This will clear the interval
```

## How does it work under the hood?

This library uses a Map to store the interval references, leveraging the `singleton` pattern.  
When you set an interval, it will be stored in the Map with the given id as key.  
When you clear an interval, it will be removed from the Map and cleared using the reference stored in the Map.

# How to run tests?

```bash
npm test
```

# Contributing

If you want to contribute to this project, please open an issue or a pull request.  
I will be happy to review it and merge it if it's useful.  
Please, remember to follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.  
