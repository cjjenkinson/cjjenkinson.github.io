---
title: How to build mono function repos with AWS CDK
date: "2020-12-17T22:12:03.284Z"
description: "Ephemeral is set of guidelines for building mono-function repos for serverless applications with AWS CDK"
---

## Introducing Ephemeral

After building monolithic serverless applications for over two years I've come to set of standards that I think provide the most flexibility for scaling application requirements.  

Sometimes we have to look beyond frameworks we currently have like the serverless framework or any zero-config 'quick to prototype' serverless tools. 

This is because once a application begins to mature these frameworks start to fall of the rails. In the serverless framework this is typicall hitting the 200 resources per cloudformation stack limit. 

When the going gets going, you need flexibility in order to meet the growing complexity of a serverless first applications. Starting with a few functions can quickly turn into 100s as experienced by the team at (Freetrade)[https://freetrade.io/blog/the-road-to-500-serverless-functions] and at Learnerbly where I currently work.

## The mono-function

A new term **mono function** is now picking up steam as a way to build monolithic applications that retain a serverless status and all the benefits that come with that.

Updates to follow, guidelines can be found here: https://github.com/cjjenkinson/Ephemeral