#!/opt/homebrew/opt/node/bin/node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { CdkStack } from '../lib/cdk-stack'
import { commonProps, env, bucketName, cloudflareIpSetArn, domainName, certificateArn } from '../lib/config'

const app = new cdk.App({
  context: {
    ...commonProps,
  },
})

new CdkStack(app, commonProps.prefix, {
  env,
  bucketName,
  cloudflareIpSetArn,
  domainName,
  certificateArn,
})
