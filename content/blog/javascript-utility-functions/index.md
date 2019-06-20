---
title: How to write Javascript utility functions
date: "2017-11-01T22:40:32.169Z"
description: ""
---


First, Last, Uniq, Extend, Defaults, Reject, Every & Some, Pluck, Once, Memoize — Vanilla JS implementations.

This is series of short posts compiled into one long post. Each method has been implemented using vanilla JS based on the logic from the [Underscore](http://underscorejs.org/) library as part of my work for Codeworks, Barcelona.

The implementations cover the core logic without behaving exactly as the Underscore methods do so this post serve as an educational resource than ready-to-use code.

Methods in post:

  1. First

  2. Last

  3. Uniq

  4. Extend

  5. Defaults

  6. Reject

  7. Every & Some

  8. Map, Filter & Reduce (I’ve kept to a single post [here](http://cameronjjenkinson.com/map-filter-reduce-deconstructed/))

  9. Pluck

  10. Once

  11. Memoize

## First

_.first is an array method that returns the first element of an **array**. Passing **n** will return the first **n** elements of the array.

```javascript
_.first([5, 4, 3, 2, 1]);
// => 5
```

The implementation below returns an array with the first n elements of an array. If n is not provided it will return an array with just the first element.

Tests:

* it should return an array with the first n elements of the array

* it should return an array with the first element if n is not a number, is zero, or negative

* it should return the entire array if n is > length

* it should return an empty array if array is not an array

    ```javascript
    first = function (array, n) {

      if (!Object.prototype.toString.call(array) === '[object Array]' || array == undefined) {
        return [];
      }

      if (n <= 0 || isNaN(n)) {
        n = 1;
      }

      n = (n > array.length) ? array.length : n;

      return array.slice(0, n);
    };
    ```

The function first checks to ensure the argument is an array before doing anything else. If it isn’t an array then we’ll return an empty array and exit the function.

If n (the number of elements to return from the first element) is negative or is not a number assign a default value of 1 to n.

If n is a number and if it is greater than the length of the array assign the length of the array to n or default to 1.

We’ll eventually reach each a point where we know how many elements from the first element to return represented as n.

The function returns the ‘first’ array elements by using the [Slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) method. [Slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) makes it easy to ‘slice out’ elements from a begin to end where n is end (number of elements and start is 0 (from first).

For Example:


    let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // without passing n, n defaults to 1

    first(array);
    // => 1, 2, 4, 5

    // when passing n will return 1 to n elements

    first(array, 5);
    // => 1, 2, 3, 4, 5
    // negative numbers default to 1

    first(array, -5);
    // => 1

    // n is greater than array length, returns the entire array
    first(array, 15);
    // => 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

## Last

An implementation of the [Underscore](http://underscorejs.org/) array method [last](http://underscorejs.org/#last). This is part of a series of posts where I’ve rebuilt different methods from the [Underscore](http://underscorejs.org/)library as part of my work for Codeworks, Barcelona.

_.last is an array method that returns the last element of an **array**. Passing **n**will return the last **n** elements of the array.

*Returns the last element of an **array**. Passing **n **will return the last **n **elements of the array.*

    _.last([5, 4, 3, 2, 1]);
    // => 1

The implementation below is a vanilla JS implementation, it returns an array with the last n elements of an array. If n is not provided it returns an array with just the last element.

Tests:

* it should return an array with the last n elements of the array
* it should return an array with the last element if n is not a number, is zero, or negative
* it should return the entire array if n is > length
* it should return an empty array if array is not an array

```javascript
last = function(array, n) {
if (!Object.prototype.toString.call(array) === '[object Array]' ||   array === undefined)
 {
   return [];
 }
if (n <= 0 || isNaN(n)) {
   return array.slice(-1);
 }
n = (n > array.length) ? array.length : n;

 return array.slice(-Math.abs(n))
}
```

When the function is invoked the passed in array argument is checked if it is an array, if it isn’t an array then we’ll return an empty array and exit the method.

Assuming an array is passed correctly, there are two checks that surround n(number of elements).

Firstly If n (the number of elements to return from the first element) is negative or is not a number a default value of 1 is assigned to n. If n is a number then it is checked against the length of the array, if it greater than the length is assign the length of the array to n.

Finally we’ll return the array elements using the built-in [slice method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) and utilise the [Maths.ab](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs) which returns the absolute value of a number which we can then use to retrive the elements from the last position to n (number of elements to return).

Example:

    let array = [1,2,3,4,5,6,7,8,9,10] last(array)
    // => [ 10 ]

    last(array, 5)
    // => [ 6, 7, 8, 9, 10 ]

    last(array, -5)
    // => [ 10 ]

    last(array, 25)
    // => [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

The first method works similair to last instead returning the first or n elements from the start of the array, check it out [here](http://cameronjjenkinson.com/2017-10-28/first-a-simple-vanilla-JS-implementation).

## Uniq

_.uniq is an array method that that produces a duplicate-free version of the **array**.

    _.uniq([1, 2, 1, 4, 1, 3]);
    // => [1, 2, 4, 3]

The vanilla JS implementation produces a duplicate-free version of the array.

Tests:

- should return an array without duplicates

```javascript
uniq = function(array) {
  var arrLength = array.length;
  var res = [];
  var tempObj = {};
  for (var i = 0; i < arrLength; i++) {
    tempObj[array[i]] = 0;
  }
  for (var key in tempObj) {
    var element = key;
    // handle strings as numbers
    if (key.match(/\d/)) {
      element = Number(key);
    }
    res.push(element);
  }
  return res;
}
```

The uniq array returns a new modified array without duplicates. The ‘without duplicates part’ appens within the tempObj which is what actually removes the duplicate elements from the array.

Initially I was looking at using the comparison approach but stumbled a [great reference](https://dreaminginjavascript.wordpress.com/2008/08/22/eliminating-duplicates/) that explained that Javascript had a built-in way to remove duplicates using Object keys.

Objects in JavaScript are hashes which are made of two parts, the left and right.

    { "left": right }

In the implementation tempObj is used as a temporary key value store where each element from the array is stored a key.

In this approach any duplicate key which is each element is removed:

*The key is unique, but of course the value can be duplicated. The “key” is the key. All I have to do is loop through the strings and assign them to the keys of an object. Hashes can automatically remove duplicates, JavaScript does the work of eliminating the duplicates naturally* — [Ref](https://dreaminginjavascript.wordpress.com/2008/08/22/eliminating-duplicates/)

As a note, a regex statement has been used to treat numbers represeted as strings as numbers when looping over the keys.

In action:


```javascript
let array = [1, 2, 3, 3, 5, 5, 6, 7, 7, 8];

uniq(array)
// => [ 1, 2, 3, 5, 6, 7, 8 ]

let arrayStr = ['word', 'program', 'word', 'sentence', 'word'];

uniq(arrayStr)
// => [ 'word', 'program', 'sentence' ]
```

## Extend

_.extend shallowly copies all of the properties **in** the **source** objects over to the **destination object**, and returns the **destination object**. Any nested objects or arrays will be copied by reference, not duplicated.

    _.extend({name: 'moe'}, {age: 50});
    // => {name: 'moe', age: 50}

Tests:

* should copy properties from source to destination
* should return the destination object
* should ignore the object prototype

```javascript
extend = function(destination, source) {
  if (destination === null || typeof destination !== 'object') {
     return destination;
  }

  if (source === null || typeof source !== 'object') {
    return source;
  }
  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      destination[key] = extend(source[key]);
    }
  }
  return destination;
}
```

Programmers use extend as a sort of ‘copy and paste’ utility to leave objects unmodified that need to be used some other prupose.

The method recieves two arguments, a destination and a source object. Both objects need to be objects and contain a value for the method to work this is the first case that is checked.

The main lohic happens inside of the for in loop because every key in the source object (var key in source) is used to create the new keys in the destination object destination[key] (which is the object we are ‘extending’ from).

We then recursively call the function to loop back over the source object values extend(source[key]); where each value is matched up with newly created destination keys, copying each value from source keys to the destination keys.

For example:

    let sourceObj = { name: 'John Smith', age: 24 };

    let destinationObj = { ID: 123490 };

    extend(destinationObj, sourceObj);
    // => { ID: 123490, name: 'John Smith', age: 24 }

Here is working repl that you can run: [https://repl.it/@cjjenkinson/extend](https://repl.it/@cjjenkinson/extend)

## Defaults

_.defaults fills in undefined properties in **object** with the first value present in the following list of **defaults** objects.

    var iceCream = {flavor: "chocolate"};

    _.defaults(iceCream, {flavor: "vanilla", sprinkles: "lots"});
    // => {flavor: "chocolate", sprinkles: "lots"}

The implementation fills in undefined properties in the destination object with own enumerable properties present in the source object, and returns the destination object.

Tests:

* should copy source properties to undefined properties in the destination object
* should return the destination object
* should ignore the object prototype

```javascript
// source = defaults
// destination = object that recieve defaults
defaults = function(destination, source) {
	var prop;
	destination = destination || {};
	source = source || {}

	for (prop in source) {
		if (source.hasOwnProperty(prop)) {
			if (destination[prop] === undefined) {
				destination[prop] = source[prop];
			}
		}
	}

	return destination;
};
```

Programmers used defaults often as a helper in setting default values that are missing or not passed to function calls. Typically they are used in-place as ‘default settings’ for methods on an object such as a library.

The implementation recieves two arguments, a destination and source object where the destination object receives its properties from source.

We want to ensure that if a property in destination is undefined or if it doesn’t exist at all we can match them up from what source has. This essentially fills in those missing properties and ignores any matches applied after.

For example

There is a baseline car with default options, 4 wheels, standad tyres and it comes in gray. A customer comes along and would like a new car but in blue.

```javascript
var car = {
	wheels: 4,
	tires: 'standard',
	color: 'gray'
}

var usersCar = {
	color: 'blue'
}

var usersCarWithDefaults = defaults(usersCar, car);
console.log(usersCarWithDefaults);
```
By using defaults we can fill in the default values from the baseline car, as the user probably won't want to change how many wheels the car has.

Another example is filling in undefined values for matching keys in defaults:

```javascript
var defaultValues = {
    id: 123,
    count: 41,
    name: 'Destination Unknown',
    values: [1,1,2,3,5,8,13]
};

var destination = {
    name: undefined,
    tag: 'javascript',
    values: undefined
};

var destinationWithDefaults = defaults(destination, defaultValues);
console.log(destinationWithDefaults);

=>
{ name: 'Destination Unknown',
  tag: 'javascript',
  values: [ 1, 1, 2, 3, 5, 8, 13 ],
  id: 123,
  count: 41 }
```

Here is working repl that you can run: [https://repl.it/@cjjenkinson/defaults](https://repl.it/@cjjenkinson/defaults)

## Reject

_.reject returns the values in **list** without the elements that the truth test (**predicate**) passes. The opposite of **filter**.

    var odds = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
    // => [1, 3, 5]

The implementation looks through each value in the collection, returning an array of all the values that don’t pass a truth test (predicate). Predicate is called with three arguments: (element, indexkey, collection).

Tests:

* should return an array of values that do not pass a truth test
* should ignore the object prototype
* should access the original collection

```javascript
reject = function (collection, predicate, context) {
  var result = [];
  if (Object.prototype.toString.call(collection) == '[object Object]') {
    for (var key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (!predicate.call(context, collection[key], key, collection)) {
          result.push(collection[key]);
        }
      }
    }
  } else {
    for (var i = 0; i < collection.length; i++) {
      if (!predicate.call(context, collection[i], i, collection)) {
        result.push(collection[i]);
      }
    }
  }
  return result;
};
```

Reject works like filter in reverse, we can pass it a collection either an array or object as well as a callback function to evaluate items to return.

In the case of reject, we only return the items that don’t meet the condition within the callback function meaning any values that match true with the callback condition are left out in the result.

For example:

    let list = [1,2,3,4,5,6,7,8,9,10];
    let odd = reject(list, item => {
    	return item % 2 === 0;
    })

    console.log(odd);
    // => [ 1, 3, 5, 7, 9 ]

    let nums = [20, 40, 50, 60, 80]
    let largeNums = reject(nums, num => {
    	return num <= 40;
    })

    console.log(largeNums);
    // => [ 50, 60, 80 ]

In the first example we have an array of numbers from 1 to 10, reject returns all of the odd values by *‘rejecting’* the even values return item % 2 === 0;.

In the second example we have an array of numbers and we want to reject any value that is less than or equal to 40.

Here is working repl that with the examples above: [https://repl.it/@cjjenkinson/reject](https://repl.it/@cjjenkinson/reject)

## Every & Some

### Every

_.every returns *true* if all of the values in the **list** pass the **predicate** truth test. Short-circuits and stops traversing the list if a false element is found.

    _.every([2, 4, 5], function(num) { return num % 2 == 0; });
    // => false

The implementation returns true if **all values** in the collection pass the predicate truth test. Predicate is called with three arguments (element, indexkey, collection), and bound to the context if one is passed

Tests:

* should return an array of values that do not pass a truth test
* should ignore the object prototype
* should access the original collection

```javascript
every = function (collection, predicate, context) {
  if (Object.prototype.toString.call(collection) == '[object Object]') {
    for (var key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (!predicate.call(context, collection[key], key, collection)) {
          return false;
        }
      }
    }
  } else {
    for (var i = 0; i < collection.length; i++) {
      if (!predicate.call(context, collection[i], i, collection)) {
        return false;
      }
    }
  }

  return true;
};
```

Every is extremely useful when making sure every element in a collection such as an array or object is how it should be.

For example, using Every to check if all of the elements are of correct type is just some of ways every can be used.

The implementation works by taking in a collection, predicate (the callback containing the condition) and the context.

The method detects what iterator should be used on the collection and within each iterator the predicate callback function is called on each element.

If all of the elements pass the condition it will return true or if they do not all pass the condition then it will return false

For example:

    // checking for correct type
    var list2 = [{userID: 1, fullName: 'Jason Smith'},{userID: 2, fullName: 'Betty Green'},{userID: '3', fullName: 'Jane Doe'}, ];

    var isCorrectType = every(list2, user => {
    	return typeof user.userID === 'number';
    });

    console.log(isCorrectType);
    // => false

### Some

_.some returns *true* if any of the values in the **list** pass the **predicate** truth test. Short-circuits and stops traversing the list if a true element is found.

    _.some([null, 0, 'yes', false]);
    // => true

The implementation returns true if **any value** in the collection passes the predicate truth test. Predicate is called with three arguments (element, indexkey, collection), and bound to the context if one is passed.

Tests:

* should return an array of values that do not pass a truth test
* should ignore the object prototype
* should access the original collection

```javascript
some = function (collection, predicate, context) {
  if (Object.prototype.toString.call(collection) == '[object Object]') {
    for (var key in collection) {
      if (collection.hasOwnProperty(key)) {
        if (predicate.call(context, collection[key], key, collection)) {
          return true;
        }
      }
    }
  } else {
    for (var i = 0; i < collection.length; i++) {
      if (predicate.call(context, collection[i], i, collection)) {
        return true;
      }
    }
  }

  return false;
};
```

The Some method works just like the Every method in that it iterates over elements in a collection but returns true immediately upon reaching the first element that matches the predicate condition.

For example:

    // list contains an undefined element
    var list1 = ['string', 'string', 'string', undefined, 'string'];

    var hasUndefined = some(list1, e => {
    	return e === undefined;
    });

    console.log(hasUndefined);
    // => true

    // contains all of the correct elements
    var list2 = ['string', 'string', 'string', 'string', 'string'];

    var hasUndefined = some(list2, e => {
    	return e === undefined;
    });

    console.log(hasUndefined);
    // => false

Every repl:[https://repl.it/@cjjenkinson/every](https://repl.it/@cjjenkinson/every)

Some repl: [https://repl.it/@cjjenkinson/some](https://repl.it/@cjjenkinson/some)
## Pluck

_.pluck is a convenient version of what is perhaps the most common use-case for **map**: extracting a list of property values.

    var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];

    _.pluck(stooges, 'name');
    // => ["moe", "larry", "curly"]

The implementation is passed an array of objects (collection), iterates over each elementTests: in the collection, and returns an array with all the values corresponding to the property indicated by propertyName.

* should return an array of values corresponding to the indicated property for each object in the collection
* missing properties are returned as undefined

```
pluck = function (collection, propertyName) {
  return map(collection, function (value) {
    return value[propertyName];
  });
};
```

Pluck is very useful for retrieving specific properties from objects (collection), the method takes a collection and a propertyName as a string which is used to retrieve all matching properties.

The Underscore map method is used as the main body of the pluck method because it can easily return a new array of elements. In this case of pluck, each element is the value of the matching property from the object in the collection.

For example:

    let metrics = [{
        app_id: 808238,
        app_name: 'App One',
        open_count: 400
    }, {
        app_id: 804562,
        app_name: 'App Two',
        open_count: 210
    }, {
        app_id: 902679,
        app_name: 'App Three',
        open_count: 3109
    }];

    const appIds = pluck(metrics, 'app_id');
    const appNames = pluck(metrics, 'app_name');
    const openCounts= pluck(metrics, 'open_count');

    console.log(appIds);
    // => [ 808238, 804562, 902679 ]

    console.log(appNames);
    // => [ 'App One', 'App Two', 'App Three' ]

    console.log(openCounts);
    // => [ 400, 210, 3109 ]

Pluck repl: [https://repl.it/@cjjenkinson/pluck](https://repl.it/@cjjenkinson/pluck)

## Once

.once creates a version of the function that can only be called one time. Repeated calls to the modified function will have no effect, returning the value from the original call. Useful for initialization functions, instead of having to set a boolean flag and then check it later.

```javascript
var initialize = _.once(createApplication);
// initialize();
// initialize();
// Application is only created once.
```

The implementation creates a version of the function that can only be called one time. Repeated calls to the modified function will have no effect, returning the value from the original call. Useful for initialization functions, instead of having to set a boolean flag and then check it later.

Tests:

* should call the function only once, and return the same result in following calls

```javascript
once = function (func) {
  var result;
  var once = false;
  return function () {
    if (!once) {
      result = func.apply(this, arguments);
      once = true;
    }
    return result;
  };
};
```

Programmers can use Once to protect certain methods that should or have been designed to only execute once.

For example: Initialising an application, creating a new DB or specific event handlers are examples of one time execution requirements.

The method accepts a function as an argument func which represents the function that should be executed once.

To protect the function from being executed more than once we use a boolean once to represent the state of whether it has been called or not.

By calling an IIFE a closure is created that stores this state to be used again if the function is called.

If it hasn’t been called at lease once then it will return false as (!true) then called using applywith relevant arguments. ` result` in this case now represents the return value of the function that was just called but its state is available because of the closure created.

After the function has been called the once state is set to true which means if the function is called again it will return true which will simply by pass the truthy condition and return the result of the first call.

For example:

```javascript
const startDatabase = () => {
	console.log('Database created...')
}

const initializeDatabase = once(startDatabase);

initializeDatabase();
// => Database created...

initializeDatabase();
// console.log only executed once
```

Once repl: [https://repl.it/@cjjenkinson/Once](https://repl.it/@cjjenkinson/Once)

## Memoize

_.memoize — memoizes a given **function** by caching the computed result. Useful for speeding up slow-running computations. If passed an optional **hashFunction**, it will be used to compute the hash key for storing the result, based on the arguments to the original function. The default **hashFunction** just uses the first argument to the memoized function as the key. The cache of memoized values is available as the cache property on the returned function.

    var fibonacci = _.memoize(function(n) {
      return n < 2 ? n: fibonacci(n - 1) + fibonacci(n - 2);
    });

The implementation ‘Memoizes’ a given function by caching the computed result. Memoize returns a function that will check if it has already computed the result for the given argument and return that value instead of recomputing it.

Tests:

* should cache already computed results
* should recompute when called with different arguments

```javascript
memoize = function (func) {
  var result = {};

  return function () {
    var args = Array.prototype.slice.call(arguments);
    if (args in result) {
      return result[args];
    } else {
      return result[args] = func.apply(this, args);
    }
  };
}
```

Programmers use Memoize to speed up slow running computations or to make functions that calculate results repeatedly more efficient.

Recommended reading: [Impelementing memoization in Javascript](https://www.sitepoint.com/implementing-memoization-in-javascript/)

[Memoization](http://en.wikipedia.org/wiki/Memoization) is a technique that used to improve the performance of functions by caching previously computed results.

To ‘Memoiz’ a function means to store the result of calling a function into an memory store such as a hash object. When the function has been ‘memoized’ the result will be readily available if the function is called again which makes it great for functions that call themselves repeately.

In the implementation, the function accepts another function as its argument represented as func. This is used to wrap in the memoize caching mechanism where result acts as caching mechanism for storing the return value.

Within Memoize a function is caleld immediately (IIFE) where args serves two purposes:

* First it is used as a look-up to check whether the cache has already computed the result which is in the form of a matching key in the result object.

* Secondly, it is used to create a new key and value for calling func with its args if it hasn’t already been computed.

This logic happens inside the conditional check which checks if the result is already present in result. If it is then it is returned but if it isn’t then the function is called and the result of that is then added to result.

For example:

```javascript
const memoize = (func) => {
  var result = {};

  return function () {
    var args = Array.prototype.slice.call(arguments);
    if (args in result) {
      // Added for demonstration purposes
      console.log('Result has already been computed...')
      return result[args];
    } else {
      return result[args] = func.apply(this, args);
    }
  };
}
const multByTwo = (num) => {
  return num * 2;
}
var memoized = memoize(multByTwo);
var result = memoized(5);
console.log(result);
// => 10;
var resultDuplicate = memoized(5);
console.log(resultDuplicate);
// => Result has already been computed...
```

Memoize repl: [https://repl.it/@cjjenkinson/memoize](https://repl.it/@cjjenkinson/memoize)

The next best steps in using this article is to re-create the methods yourself, breaking each part of the logic down and testing out the functionality.

Since doing this as part of pre-work to Codeworks I’ve greatly enhanced my baseline Javascript knowledge.


