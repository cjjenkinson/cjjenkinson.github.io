---
title: Setting up a development environment with localstack and docker
date: "2018-12-01T22:40:32.169Z"
description: ""
---

I recently finished a task that involved setting a development environment to build a Lambda function that would interact with AWS services.

The Lambda would be evoked on S3 put events which would then stream and parse XML files to JSON before inserting the result into a DynamoDB table.

The first pain point I had was understanding how to interface with AWS services locally. This involved setting up a local AWS environment.

I used [localstack](https://github.com/localstack/localstack) to do this.

Localstack provides an easy-to-use test/mocking framework for developing applications on AWS. It provides emulation of the most popular AWS services locally which can be accessed with the same SDK's provided by AWS such as the Node [aws-sdk](https://aws.amazon.com/sdk-for-node-js/). 

Getting all the services running together was the next challenge and Docker was the next step for creating a self contained environment. 

I wanted it to be fairly easy for another developer to spin up and work on the function without having to ask me for credentials or how to install Localstack.

The following will go over the configuration files I used to make this work with Localstack and Docker for a faily harmonious development environment for AWS services.

### Setting up the Docker container

Set up a boilerplate Node project using NPM or Yarn then create a Dockerfile.

```
yarn init
```

Run through the Yarn prompts then

```
touch Dockerfile
```

#### Dockerfile:

```dockerfile
FROM node:8.4.0

RUN apt-get update

# Official AWS documentation recommends using python3 and associated tooling.That doesn't work, or at least it does not work as easily as advertised.
RUN apt-get install python-dev python-pip -y

# The awsebcli has a dependency issue and this resolves it
RUN easy_install --upgrade six

RUN pip install awscli

WORKDIR /usr/src/app
COPY package.json yarn.lock /usr/src/app/

RUN yarn

COPY . /usr/src/app

CMD ["yarn", "dev"]
```

A [Dockerfile](https://docs.docker.com/engine/reference/builder/) is used to build images from the instructions laid out using commands where those commands are run sequentially from this file.

In our Dockerfile we start by installing Node and the development pain free version of python and pip to avoid errors when working with the [aws-cli](https://aws.amazon.com/cli/). Once the aws-cli is installed, the working directory is set where the Node dependencies are added and the project script commands can be run.

We'll define the same working directory path in the ```docker-compose.yml``` file next.

#### Docker-compose.yml

```yaml
version: '3'
services:
  lambda-parser:
    build: .
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
    environment:
      - AWS_ACCESS_KEY_ID=foobar
      - AWS_SECRET_ACCESS_KEY=foobar
      - AWS_DEFAULT_REGION=us-east-1
      - AWS_S3_ENDPOINT=http://lambda-parser-aws:4572
      - AWS_S3_PATH_STYLE=true
      - AWS_DDB_ENDPOINT=http://lambda-parser-aws:4569
    depends_on:
      - lambda-parser-aws
    command: sh -c "yarn && yarn dev"
  lambda-parser-aws:
    image: localstack/localstack:0.8.7
    ports:
      - "5000:8080"
      - "4572:4572"
      - "4569:4569"
    expose:
      - "4572"
      - "4569"
    environment:
      - SERVICES=s3,dynamodb
      - HOSTNAME=lambda-parser-aws

```

A Docker Compose file is a [YAML](http://yaml.org/) file defining [services](https://docs.docker.com/compose/compose-file/#service-configuration-reference), [networks](https://docs.docker.com/compose/compose-file/#network-configuration-reference) and [volumes](https://docs.docker.com/compose/compose-file/#volume-configuration-reference).

The service definition contains a configuration that is applied to each container started for that service.

We will define __two service configurations__, the *lambda-parser* and the localstack service as *lambda-parser-aws*.

- The lambda-parser service  represents the Node.js project that the lambda will be developed in. It will interact with the localstack container over a default network created automatically by docker-compose.

- The lambda-parser-aws service will expose the localstack instance through the defined port 5000 and every other service we define on their respective ports [listed here](https://github.com/localstack/localstack#overview).

We'll need to tell localstack to expose the S3 & DynamoDB services on ports 4572 and 4569.

If you'd like to add additional services such as SQS simply add them to the SERVICES=s3,dynamodb,sqs and expose the port defined from the localstack [documentation](https://github.com/localstack/localstack#overview).

#### Makefile

```makefile
.PHONY: up down reboot help

## Run the service and watch for changes
up: docker-clean-images
	docker-compose up

## Shut down the service and any associated volume
down:
	docker-compose down --volumes

## Start from scratch again
reboot: down up

docker-clean-images:
	docker image prune --force --filter "until=24h"

docker-clean-volumes:
	docker volume prune --force

docker-nuke:
	docker system prune --force --all

## Run a yarn command inside the container
%:
	docker-compose exec ern-processor yarn $@

```

A Makefile is a special file, containing shell commands executed on the terminal.

In our Makefile we want to be able to use Docker Compose to spin up all of the services we defined in the ```docker-compose.yml``` file which will also be in charge of running the Node script ```yarn dev``` from the Dockerfile.

I think Makefiles are great for this type of problem because it gives you a single access point for interacting with your entire application stack.

```make down``` will spin down the Docker containers cleaning up resources and ```make reboot``` will restart all containers after spinning them down.

##### Setting up aws-cli shell scripts

```javascript
const shell = require('shelljs');

// S3
shell.echo('Creating s3 bucket and uploading ingest...');

shell.exec('aws --endpoint-url=http://lamda-parsar-aws:4572 s3 mb s3://my-bucket');
shell.exec('aws --endpoint-url=http://lamda-parsar-aws:4572 s3 sync ingest s3://my-bucket --acl public-read');
shell.exec('aws --endpoint-url=http://lamda-parsar-aws:4572 s3api get-object-acl --bucket my-bucket --key my-xml-file.xml');

// Dynamodb
shell.echo('Creating DynamoDB table...');
shell.exec('aws --endpoint-url=http://lambda-parsar-aws:4569  dynamodb create-table \
          --table-name XmlToJson \
          --attribute-definitions \
              AttributeName=ID,AttributeType=S \
          --key-schema AttributeName=ID,KeyType=HASH \
          --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1');

shell.echo('Bootstrap complete');
```

At this point you might be wondering how we work with the AWS services on localstack, how do I actually create a Bucket and DynamoDB table.

You have a couple of options:

1. write scripts that utilise the AWS Sdk to provision the services you need and seed them with data
2. use the aws-cli to provision the services and seed them with data

Using ```shelljs``` npm package we are going to work with the second option. Essentially you'll define terminal commands that will be executed in order using the aws-cli inside the lambda-parsar Docker container.

I've added a couple of example scripts that create an S3 bucket, upload some data and change the permissions on the created object to public. Thenwe create the DynamoDB table and define the key schema as 'ID' which will be the primary hash key used to look-up entities.

The purpose of this bootstrapping file is to simulate what your DevOps flow would look like when you actually create the services on AWS.

Doing it from within the Node project allowed me to quickly create the instances and configuration I needed to focus solely on the business logic of the Lambda itself, harmonious right?

### Wrapping Up

From here you have most of the boilerplate needed to start developing  with AWS services without needing to work with any live instances.

There is not much left to add accept your own business logic.


