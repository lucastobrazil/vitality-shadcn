import { fromEnv, shortEnvironmentName, longEnvironmentName, isProduction } from '@genie-engineering/cdk-lib'

const configFromEnv = fromEnv({
  environment: 'ENVIRONMENT',
  deployment: 'DEPLOYMENT',
  deploymentJob: 'DEPLOYMENT_JOB',
  createdBy: 'CREATED_BY',
  version: 'VERSION',
  repository: 'REPOSITORY',
})

const application = 'vitality'
const service = 'shadcn'

const prefixProps = [
  shortEnvironmentName(configFromEnv.environment),
  configFromEnv.deployment,
  application,
  service,
]
const prefix = prefixProps.filter(prop => prop !== '').join('-')

const accountId = '551655797952'
const region = 'us-east-1'
const bucketName = `shadcn-${accountId}-${region}`

const cloudflareIpSetArn =
  'arn:aws:wafv2:us-east-1:551655797952:global/ipset/security-cloudflare-cloudfront-ipset/81352cc6-d0d4-45d3-b60f-ef8dbe589014'
const cloudflareIpSetV6Arn =
  'arn:aws:wafv2:us-east-1:551655797952:global/ipset/security-cloudflare-cloudfront-ipset-v6/68ee77ba-5373-4cc8-b349-56851aa7c27d'

const domainName = 'shadcn.vitalitydesignsystem.com'
const certificateArn = 'arn:aws:acm:us-east-1:551655797952:certificate/935f70a7-bd28-4709-91cf-fea4ff0684ff'

const commonProps = {
  application,
  service,
  environment: longEnvironmentName(configFromEnv.environment),
  deployment: configFromEnv.deployment,
  deploymentJob: configFromEnv.deploymentJob,
  createdBy: configFromEnv.createdBy,
  version: configFromEnv.version,
  prefix,
  isProduction: isProduction(configFromEnv.environment),
  repository: configFromEnv.repository,
}

const env = {
  account: accountId,
  region,
}

export { commonProps, env, bucketName, cloudflareIpSetArn, cloudflareIpSetV6Arn, domainName, certificateArn }
