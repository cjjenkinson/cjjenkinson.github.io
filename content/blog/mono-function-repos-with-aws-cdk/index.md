---
title: How to build mono function repos with AWS CDK
date: "2020-12-17T22:12:03.284Z"
description: "Ephemeral is set of guidelines for building mono-function repos for serverless applications with AWS CDK"
---

## Introducing Ephemeral

After building monolithic serverless applications for over 2 years I've come to set of standards that I think provide the most flexibility for scaling application requirements and business logic extending beyond frameworks like the serverless framework, firebase or any zero-config 'quick to prototype' serverless tools.

When the going gets going, you need flexibility in order to meet the growing complexity of a serverless first applications. Starting with a few functions can quickly turn into 100s as experienced by the team at (Freetrade)[https://freetrade.io/blog/the-road-to-500-serverless-functions] and at Learnerbly where I currently work.

## The mono-function

A new term **mono function** is now picking up steam as a way to build monolithic applications that retain a serverless status and all the benefits that come with that.

Updates to follow, guidelines can be found here: https://github.com/cjjenkinson/Ephemeral