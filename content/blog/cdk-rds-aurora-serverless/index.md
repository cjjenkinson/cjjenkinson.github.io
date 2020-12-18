---
title: 'How to create an RDS Aurora serverless instance with CDK'
date: "2020-04-12T22:12:03.284Z"
description: 'Aurora Serverless is a cloud computing database service that removes to need to worry about connection pools'
---

Before Aurora there were limited options for database services for serverless first infrastructure. This was because managing connection pools was difficult and posed risks within a limited computation window of a Lambda function.

Things have changed now because we can run Lambda executions for longer and AWS is focused on serverless focused services like Aurora. 

> Amazon Aurora Serverless is an on-demand, auto-scaling configuration for Amazon Aurora (MySQL-compatible and PostgreSQL-compatible editions), where the database will automatically start up, shut down, and scale capacity up or down based on your application's needs. 

Let's go ahead and create an [Aurora Serverless](https://aws.amazon.com/rds/aurora/serverless/) instance on AWS with CDK.

Here is the entire stack upfront below. I dive into each section in further detail below.


```javascript
const cdk = require('@aws-cdk/core');
const rds = require('@aws-cdk/aws-rds');
const secretsManager = require('@aws-cdk/aws-secretsmanager');
const ssm = require('@aws-cdk/aws-ssm');

class DBStack extends cdk.Stack {
  constructor(app, id, { serviceName = 'movies', stage, accountId, }) {
    super(app, id);

    const databaseUsername = 'movies-database';

    const databaseCredentialsSecret = new secretsManager.Secret(this, 'DBCredentialsSecret', {
      secretName: `${serviceName}-${stage}-credentials`,
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          username: databaseUsername,
        }),
        excludePunctuation: true,
        includeSpace: false,
        generateStringKey: 'password'
      }
    });

    new ssm.StringParameter(this, 'DBCredentialsArn', {
      parameterName: `${serviceName}-${stage}-credentials-arn`,
      stringValue: databaseCredentialsSecret.secretArn,
    });

    const isDev = stage !== "production";
    const dbConfig = {
      dbClusterIdentifier: `main-${serviceName}-${stage}-cluster`,
      engineMode: 'serverless',
      engine: 'aurora-postgresql',
      engineVersion: '10.7',
      enableHttpEndpoint: true,
      databaseName: 'main',
      masterUsername: databaseCredentialsSecret.secretValueFromJson('username').toString(),
      masterUserPassword: databaseCredentialsSecret.secretValueFromJson('password'),
      backupRetentionPeriod: isDev ? 1 : 30,
      finalSnapshotIdentifier: `main-${serviceName}-${stage}-snapshot`,
      scalingConfiguration: {
        autoPause: true,
        maxCapacity: isDev ? 4 : 384,
        minCapacity: 2,
        secondsUntilAutoPause: isDev ? 3600 : 10800,
      }
    };

    const rdsCluster = new rds.CfnDBCluster(this, 'DBCluster', { dbConfig,
      deletionProtection: isDev ? false : true,
    });

    const dbClusterArn = `arn:aws:rds:${this.region}:${this.account}:cluster:${rdsCluster.ref}`;

    new ssm.StringParameter(this, 'DBResourceArn', {
      parameterName: `${serviceName}-${stage}-resource-arn`,
      stringValue: dbClusterArn,
    });
  }
}

module.exports = { DBStack };
```

## Breaking it down

#### Authentication credentials

Storing the authentication credentials in [secrets manager](https://aws.amazon.com/secrets-manager/) makes it easy to access the instance from different services e.g a lambda function as well as when doing manual queries from the console UI.

We define a new secret here and store the database credentials in SSM parameter store. An option has been passed to generate a random password for the password field which is pretty handy.

```javascript
   const databaseCredentialsSecret = new secretsManager.Secret(this, 'DBCredentialsSecret', {
      secretName: `${serviceName}-${stage}-credentials`,
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          username: databaseUsername,
        }),
        excludePunctuation: true,
        includeSpace: false,
        generateStringKey: 'password'
      }
    });

    new ssm.StringParameter(this, 'DBCredentialsArn', {
      parameterName: `${serviceName}-${stage}-credentials-arn`,
      stringValue: databaseCredentialsSecret.secretArn,
    });
```

#### Aurora instance configuration

The main configuration for the Aurora instance takes mostly from the RDS cdk package where we can define explicit cloud formation resources. In this case we need to define a [RDS Cluster](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-rds.CfnDBCluster.html) and pass in the options to turn it into an Aurora Serverless instance.

There are a couple of essential options to pass including engineMode, enableHttpEndpoint and the scalingConfiguration.

When choosing between the underlying database engine you can either use Postgres or SQL, the default is SQL.

I've set a different scaling configuration depending on the deployment stage, in the case of the development is makes sense to keep the maxCapacity to a low number and higher for production. 

```javascript
  const dbConfig = {
      dbClusterIdentifier: `main-${serviceName}-${stage}-cluster`,
      engineMode: 'serverless',
      engine: 'aurora-postgresql',
      engineVersion: '10.7',
      enableHttpEndpoint: true,
      databaseName: 'main',
      masterUsername: databaseCredentialsSecret.secretValueFromJson('username').toString(),
      masterUserPassword: databaseCredentialsSecret.secretValueFromJson('password'),
      backupRetentionPeriod: isDev ? 1 : 30,
      finalSnapshotIdentifier: `main-${serviceName}-${stage}-snapshot`,
      scalingConfiguration: {
        autoPause: true,
        maxCapacity: isDev ? 4 : 384,
        minCapacity: 2,
        secondsUntilAutoPause: isDev ? 3600 : 10800,
      }
    };


   const isDev = stage !== "production";
   const rdsCluster = new rds.CfnDBCluster(this, 'DBCluster', { dbConfig,
      deletionProtection: isDev ? false : true,
    });

```

#### Resource ARN

The CFNCluster does not output the Resource ARN unlike other CDK constructors so we need to construct it manually. 

We can then store the ARN in SSM parameter store which can be used alongside the authentication credentials ARN to execute queries through the relevant Aurora SDK.

```javascript
const dbClusterArn = `arn:aws:rds:${this.region}:${this.account}:cluster:${rdsCluster.ref}`;

new ssm.StringParameter(this, 'DBResourceArn', {
  parameterName: `${serviceName}-${stage}-resource-arn`,
  stringValue: dbClusterArn,
});
```

Spin it up and see it running.
