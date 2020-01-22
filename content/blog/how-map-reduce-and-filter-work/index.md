---
title: How Map, Reduce and Filter work
date: "2016-08-10T22:12:03.284Z"
description: "A breakdown of the implementation of map, reduce and filter with Javascript."
---

A breakdown of the implementation of
[Map](http://underscorejs.org/#map), [Reduce](http://underscorejs.org/#reduce)
and [Filter](http://underscorejs.org/#filter) methods with various examples.

## Map

Map produces a new array of values by mapping each value in **list** through a transformation function (**iteratee**). The `iteratee` is passed three arguments: the `value`, then the `index` (or `key`) of the iteration, and finally a reference to the entire `list`.

```javascript
map([1, 2, 3], function(num){ return num * 3; });
// => [3, 6, 9]

map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; });
// => [3, 6, 9]
```

Returns a new array of values by mapping each value in collection through iteratee.
Each invocation of iteratee is called with three arguments: (element, index|key, collection),
and bound to the context if one is passed.

Tests:

- should return an array with the results of applying iteratee to each element
- should ignore the object prototype
- should access the original collection

```javascript
map = function (collection, iteratee, context) {
  var result = [];

  if (Object.prototype.toString.call(collection) == '[object Object]') {
    for (var key in collection) {
      if (collection.hasOwnProperty(key)) {
        result.push(iteratee.call(context, collection[key], key, collection));
      }
    }
  } else {
    for (var i = 0; i < collection.length; i++) {
      result.push(iteratee.call(context, collection[i], i, collection));
    }
  }

  return result;
};
```

The map method transforms an array by applying a function to all of its elements whilst building up a new array from the returned values. The new array will have the same length as the `collection` but the elements will have been “mapped” to a new value by the callback function `iteratee`.

The implementation three arguments are passed in `collection`, `iteratee` and `context`. Initially we determine how we should iterate over the collection, if the collection (the object we are mapping) is an `object Object` then we use the `for in` syntax and in any other case we use a standard `for` loop.

Within the loop, we push the result of calling the `iteratee` function (the callback) using the `call` method on each element into the `result` array. The `result` will be an array of elements which have been transformed by the `iteratee` callback.

We use `call` to keep track of what arguments are passed where we explicitly define the context (`this`) and the current element `collection[i]` the index `i`, and the rest of the elements from the `collection`.

## Reduce

Reduce Also known as **inject** and **foldl**, reduce boils down a **list** of values into a single value.

```javascript
var sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
// => 6
```

Reduce boils down a collection of values into a single value. Accumulator is the initial state of the reduction, and each successive step of it should be returned by iteratee.

Tests:

- should be able to reduce a collection to a single value
- should ignore the object prototype
- should access the original collection

```javascript
each = function (collection, iteratee, context) {

  if (Object.prototype.toString.call(collection) == '[object Object]') {
    for (var key in collection) {
      if (collection.hasOwnProperty(key)) {
        iteratee.call(context, collection[key], key, collection);
      }
    }
  } else {
    for (var i = 0; i < collection.length; i++) {
      iteratee.call(context, collection[i], i, collection);
    }
  }

  return collection;
};

reduce = function (collection, iteratee, accumulator, context) {

  each(collection, function (element, key) {
    if (accumulator !== undefined) {
      accumulator = iteratee.call(context, accumulator, element, key, collection);
    } else {
      accumulator = element;
    }
  });

  return accumulator;
};
```

The `Each` method loops over a collection of elements with a callback function, a key difference between what each does and map is that each does not return a new array it does not modify the original collection.

When using `Each` it's best to save the result to a new variable if you need a new collection transformed by the callback.

The reason I've used `Each` is that we want to use the `iteratee` on to transform each element without modifying the original object so that the reduce can happily return it itself.

An easy way to think of Reduce is to imagine folding up an array one element at a time where each element is combined into one single primitive value.

The Reduce implementation works by taking in an extra argument the `accumulator` compared with the Map and Filter method. The `accumlator` acts as the total or the initial value that is returned within reduce method. We use each to iterate over every element (from left to right) from the `collection` which is reduced into a single value. The `accumulator` is set to to an initial value or the first element in the collection.

I've read recommendations in the past that when using Reduce and encountering issues it is typically centered around the initial value. This is because Reduce assumes that the first item in the array is the initial value which can present issues depending on the total or final value you'd like to return. Always go back and check with the initial value is first if you encouter issues.

A more robust implementation of reduce accounting for more edge cases:

```javascript
 function reduce(array, callback, initialValue) {
        var startingIndex = 0;
        var resultSoFar = initialValue;
        var length = array.length;
        var arrayIndexes = Object.keys(array);

        if (arguments.length < 3) {
            // Array is empty, throw typeError
            if (arrayIndexes.length === 0) {
                throw new TypeError('Reduce of empty array with no initial value');
            }

            // If array has one element, just return it
            if (arrayIndexes.length === 1) {
                var onlyIndex = arrayIndexes[0];
                var onlyElement = array[onlyIndex];
                return onlyElement;
            }

            // We want to skip holes at the beginning of the array
            while (startingIndex in array === false && startingIndex < length) {
                startingIndex++;
            }

            resultSoFar = array[startingIndex];
            startingIndex++
            // has initial value
        } else {
            // check if array is empty
            if (arrayIndexes.length === 0) {
                return initialValue;
            }
        }

        for (var i = startingIndex; i < length; i++) {
            if (i in array) {
                resultSoFar = callback(resultSoFar, array[i], i, array);
            }
        }

        return resultSoFar;
    };
```

## Filter

Filter looks through each value in the **list**, returning an array of all the values that pass a truth test (**predicate**).

*filter* gives us a new array which only includes the values that pass a truth test.

```javascript
var evens = filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// => [2, 4, 6]
```

Looks through each value in the collection, returning an array of all the values that pass a truth test (`predicate`). Predicate is called with three arguments: (element, index|key, collection), and bound to the context if one is passed.

Tests:

- should return an array of values that pass a truth test
- should ignore the object prototype
- should access the original collection
- should bind to context if one is passed

```javascript
filter = function (collection, predicate, context) {
  var result = [];

  if (Object.prototype.toString.call(collection) == '[object Object]') {
    for (var key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (predicate.call(context, collection[key], key, collection)) {
          result.push(collection[key]);
        }
      }
    }
  } else {
    for (var i = 0; i < collection.length; i++) {
      if (predicate.call(context, collection[i], i, collection)) {
        result.push(collection[i]);
      }
    }
  }

  return result;
};
```

Filter creates a new array containing a subset of the original array. The result has these elements that pass the test (`predicate`  implemented by the provided function, which should return true or false.

Within the implementation three arguments are passed in `collection`, `predicate` and `context`. We determine how we should iterate over the collection and within the loop we take each element from the collection and pass the element if it matches the condition from calling the `predicate` function (the callback) using the `call` method where all elements that come back true will be pushed into the result array.


## Examples:

I've included a range of examples for using Map, Filter and Reduce below including a more advanced example at the end.

### Find the sum from an array of numbers

```javascript
const euros = [13.45, 289.30, 89.4, 142.67];

const sum = euros.reduce((total, amount) => total += amount);

console.log(sum);
// => 534.82
```

### Count the number of occurances

```javascript
const phones = ['iphone x', 'pixel 2', 'samsung s8', 'pixel 2', 'iphone 7', 'pixel 2', 'samsung s8', 'iphone x', 'huwei mate'];

const count = phones.reduce((count, phone) => {
  count[phone] = (count[phone] || 0) + 1 ;
  return count;
} , {})

console.log(count)
// { 'iphone x': 2, 'pixel 2': 3, 'samsung s8': 2, 'iphone 7': 1, 'huwei mate': 1 }
```

### Flatten a multi-dimensional array

```javascript
const multiArray = [[2, 4, 6, 8], [10, 12, 14, 16], [18, 20, 22, 24]];

let flattened = multiArray.reduce((arr, arrSub) => {
    return arr.concat(arrSub);
}, []);

console.log(flattened);
// => [ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24 ]
```

### Flatten object properties as arrays

```javascript
const phones = [
  {model: 'Iphone', manufacturer: 'Apple', tags: ['face ID','animated emojis']},
  {model: 'Pixel', manufacturer: 'Google', tags: ['Google assistant','Touch ID','Best camera']},
  {model: 'S8', manufacturer: 'Samsung', tags: ['Curved screen','Best display']}
];

// Use reduce to get all colors into a single array

var tagsArr = phones.reduce((phones, phone) => {
  return phones.concat(phone.tags);
}, []);

console.log(tagsArr);
// [ 'face ID', 'animated emojis', 'Google assistant', 'Touch ID', 'Best camera', 'Curved screen', 'Best display' ]
```

## Chaining Map, Reduce and Filter together:

```javascript
var totals = [
  { amount: 3 },
  { amount: 6 },
  { amount: 8 },
  { amount: 22 },
  { amount: 15 },
]

// Filter amounts above 6 and calculate the total using reduce

var largestAmount = totals
	.filter((order) => order.amount > 6)
	.map((order) => order.amount)
  	.reduce((total, amount) => {
  		return total + amount;
	},0);

console.log(largestAmount);
// => 45
```

another example of chaining..


```javascript
var animals = [
  { name: 'Hubert', type: 'panther', age: 3 },
  { name: 'George', type: 'lion', age: 4 },
  { name: 'Fredrick', type: 'lion', age: 6 },
  { name: 'Midnight', type: 'panther', age: 9 },
];

var panthers = animals
  .filter((animal) => animal.type === 'panther')
  .map((panther) => panther.name);

console.log(panthers);
// => [ 'Hubert', 'Midnight' ]

var totalLionYears = animals
  .filter((x) => x.type === 'lion')
  .map((x) => x.age)
  .reduce((prev, cur) => {
    return prev + cur
  }, 0);

console.log(totalLionYears);
// => 10
```

and one more..


```javascript
var activityData = [
  {activity: 'Running', distance: '4', time: '120'},
  {activity: 'Cycling', distance: '12', time: '340'},
  {activity: 'Swimming', distance: '38', time: '510'},
];

const totalDistance = activityData
  .map((activity) => Number(activity.distance))
  .reduce((total, distance) => {
    return total + distance;
  }, 0);

console.log(totalDistance);
// => 54

const totalTime = activityData
  .map((activity) => Number(activity.time))
  .reduce((total, time) => {
    return total + time;
  }, 0);

const formatTime = num => {
  let hours = Math.floor(num / 60);
  let minutes = num % 60;
  return hours + ':' + minutes;
}

console.log(formatTime(totalTime));
// => 16:10

const enduringActivity = activityData
  	.filter((activity) => activity.time > 300)
  	.map((name) => name.activity);

console.log('The most enduring activities are: ' + enduringActivity);
// => The most enduring activities are: Cycling, Swimming
```

### Reducing Unstructured Data into an Object

Useful for processing data from a txt file or an array.

```javascript
// #4 Reduce an array of unstructured data into a structured object

var orderData = [
  ['cameron jenkinson', 'macha tea', '4', '2'],
  ['cameron jenkinson', 'javascript book', '16', '1'],
  ['lois male', 'glitter sticks', '4', '4'],
  ['lois male', 'gold paint', '12', '2']
];

const output = orderData.reduce((customers, [name, order, price, quantity]) => {
  customers[name] = customers[name] || [];
  customers[name].push({
    order,
    price,
    quantity
  });
  return customers;
}, {});

console.log(JSON.stringify(output, null, 2));
/*
  "cameron jenkinson": [
    {
      "order": "macha tea",
      "price": "4",
      "quantity": "2"
    },
    {
      "order": "javascript book",
      "price": "16",
      "quantity": "1"
    }
  ],
  "lois male": [
    {
      "order": "glitter sticks",
      "price": "4",
      "quantity": "4"
    },
    {
      "order": "gold paint",
      "price": "12",
      "quantity": "2"
    }
  ]
}
*/
```

### Advanced example

When presented with a problem on making data more consumable these methods can be powerful in transforming API data into whatever format you require.

In the example below we have a `timesObject` which represents a structure of opening times by day.

We want to turn this object into an iterable array using Reduce and Map.

```javascript
const timesObject = {
	monday: [{ open: '00:00', close: '23:00' }],
	tuesday: [{ open: '00:00', close: '23:00' }],
	wednesday: [{ open: '01:00', close: '23:00' }],
	thursday: [],
	friday: [],
	saturday: [],
	sunday: [],
};

function objectIntoArray(timesObject) {
	if (!timesObject || Object.keys(timesObject).length === 0) return [];

	let res = Object.keys(timesObject)
    	// filter the days which have opening times
		.filter(day => timesObject[day].length)
		.reduce((allDays, day) => {
			let time = timesObject[day][0];
			let openingTime = time.open + '-' + time.close;
			allDays[openingTime] = allDays[openingTime] || { open: time.open, close: time.close, days: [] };
      // push the days that correspond with the same opening time
			allDays[openingTime].days.push(day);
			return allDays;
		}, {});

  	// map over each openining time into a new array
	let array = Object.keys(res).map(key => res[key])

	return array;
}

objectIntoArray(timesObject);

/*
 [ { open: '00:00', close: '23:00', days: [ 'monday', 'tuesday' ] },
  { open: '01:00', close: '23:00', days: [ 'wednesday' ] } ]
*/
```

<iframe height="600px" width="100%" src="https://repl.it/@cjjenkinson/objectToArray?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals" width="100%" ></iframe>

This all for Map, Reduce and Filter. I hope you found it helpful.

Thanks for your time

