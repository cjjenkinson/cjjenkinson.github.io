---
title: How async/await works in Array reduce
date: "2019-06-21T22:12:03.284Z"
description: ""
---

I found myself Googling this question a few too many times and I'd like to talk about it.

Making asynchronous calls on a collection within Reduce has a few caveats that other Array iteration methods like ```.map``` don't come with.

Let's walk through a common example

## Problem

I need to make a call to a database to retrieve information to build up a new collection with that information. The call to the database is asynchronous therefore I need to await it before continuing with execution.

My example is a real scenario I worked on recently. I had a collection of media elements that each had music associated with it. The music associated with was a list of tracks that would be played on this media element when it was streamed like a playlist.

The information needed to be organised into a usage report so we could track which tracks were played when a media element was streamed.

In order to build this I had to reach out to multiple tables to get all the track information and merge them into a collection to be used for reporting.

The context is not that important but what we do inside reduce that is.

## Solution


```javascript
export const getTrackDetails = async ({
	db,
	lessonMediaByVendorKey
}) => Object.entries(lessonMediaByVendorKey).reduce(async (prev, [key, vendor]) => {
	// 1. Get the track information from the music associated with the media element
	// 2. Add the track to the collection for usage reporting
}, []);
```

### Get the track information from the music associated with the media element

```javascript
const getTrackFromMusicInfo = async ({
	db,
	lessonMediaByVendor
}) => lessonMediaByVendor.reduce(async (prev, lessonMedia) => {
	// 1. Get all the track information from the tables
	// 2. Merge the track information together
}, {});
```
The first asynchronous call is to another function called getTrackFromMusicInfo which reaches out to the two tables to gather the information for the track played.

```javascript
const getTrackFromMusicInfo = async ({
	db,
	lessonMediaByVendor
}) => lessonMediaByVendor.reduce(async (track, lessonMedia) => {
	// Wait, why do we await the accumulator?
	const acc = await track;

	const { music_id: musicId } = lessonMedia;

	const musicInfo = await db
		.select('*')
		.from('workout.music_tracks')
		.where('music_id', musicId)
		.first();

	const { track_info_id: trackId } = musicInfo;

	const trackInfo = await db
		.select('*')
		.from('workout.track_info')
		.where('id', trackId)
		.first();

	return {
	  ...track,
	  trackInfo,
	};
}, Promise.resolve({}));
```
So this is the first lesson to be learned on async/await inside Reduce and that is the accumulator is always a Promise.

*It is a Promise based on the previous execution.*

That means we need to resolve it after each iteration to actually get to the track returned inside the function from the DB calls.

That is why we make the initial value of the reduce to be a fake resolved value in order to keep resolving the promises returned from each iteration.

This is the main thing when using async/await inside reduce. We have to await the previous accumulator value in order to actually get to the accumulator otherwise it would return a Promise and you would not be able to resolve it where it was called.

### Add the track to a collection for each media

```javascript
export const getTrackDetails = async ({
	db,
	lessonMediaByVendorKey
}) => Object.entries(lessonMediaByVendorKey).reduce(async (prev, [key, vendor]) => {

	const acc = await prev;

	const { name, lessonMediaByVendor } = vendor;

	const track = await getTrackFromMusicInfo({ db, lessonMediaByVendor });

	const tracks = (acc[key] && acc[key]) || [];

	tracks.push(track);

	return acc.concat({
		key,
		name,
		tracks,
	});
}, Promise.resolve([]));
```

Now we make the async calls to get the track information for each media element with ```getTrackFromMusicInfo``` which returns the track object when it is resolved within its own execution context.

Failing to await the Promise returned by the accumulator inside the call would result in the ```getTrackFromMusicInfo```  returning a Promise object.

### Wrapping up

- The initial value of the Reduce method should be a dummy promise to resolve the accumulator value like an Object {} or Array []
- Always await the previous call (the accumulator) at the top of the reduce function to get to the accumulator value
