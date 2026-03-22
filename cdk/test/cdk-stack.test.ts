import * as cdk from 'aws-cdk-lib'
import { Match, Template } from 'aws-cdk-lib/assertions'
import { CdkStack } from '../lib/cdk-stack'

describe('CdkStack', () => {
  const app = new cdk.App({
    context: {
      application: 'vitality',
      service: 'shadcn',
      environment: 'production',
      deployment: '',
      deploymentJob: '',
      createdBy: 'test',
      version: '0.0.1',
      prefix: 'prod-vitality-shadcn',
      isProduction: true,
      repository: 'vitality-shadcn',
    },
  })

  const stack = new CdkStack(app, 'TestStack', {
    env: { account: '551655797952', region: 'us-east-1' },
    bucketName: 'shadcn-551655797952-us-east-1',
    cloudflareIpSetArn:
      'arn:aws:wafv2:us-east-1:551655797952:global/ipset/security-cloudflare-cloudfront-ipset/81352cc6-d0d4-45d3-b60f-ef8dbe589014',
    cloudflareIpSetV6Arn:
      'arn:aws:wafv2:us-east-1:551655797952:global/ipset/security-cloudflare-cloudfront-ipset-v6/68ee77ba-5373-4cc8-b349-56851aa7c27d',
    domainName: 'shadcn.vitalitydesignsystem.com',
    certificateArn: 'arn:aws:acm:us-east-1:551655797952:certificate/935f70a7-bd28-4709-91cf-fea4ff0684ff',
  })

  const template = Template.fromStack(stack)

  test('creates S3 bucket with correct name', () => {
    template.hasResourceProperties('AWS::S3::Bucket', {
      BucketName: 'shadcn-551655797952-us-east-1',
    })
  })

  test('blocks all public access', () => {
    template.hasResourceProperties('AWS::S3::Bucket', {
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    })
  })

  test('has RETAIN deletion policy', () => {
    template.hasResource('AWS::S3::Bucket', {
      DeletionPolicy: 'Retain',
      UpdateReplacePolicy: 'Retain',
    })
  })

  test('creates OAC bucket policy scoped to distribution', () => {
    template.hasResourceProperties('AWS::S3::BucketPolicy', {
      PolicyDocument: {
        Statement: Match.arrayWith([
          Match.objectLike({
            Effect: 'Allow',
            Principal: { Service: 'cloudfront.amazonaws.com' },
            Action: 's3:GetObject',
            Condition: {
              StringEquals: {
                'AWS:SourceArn': Match.anyValue(),
              },
            },
          }),
        ]),
      },
    })
  })

  test('creates WAF WebACL with CloudFlare IP set allow rule', () => {
    template.hasResourceProperties('AWS::WAFv2::WebACL', {
      DefaultAction: { Block: {} },
      Scope: 'CLOUDFRONT',
      Rules: [
        {
          Name: 'AllowCloudFlareIPs',
          Priority: 0,
          Action: { Allow: {} },
          Statement: {
            OrStatement: {
              Statements: [
                {
                  IPSetReferenceStatement: {
                    Arn: 'arn:aws:wafv2:us-east-1:551655797952:global/ipset/security-cloudflare-cloudfront-ipset/81352cc6-d0d4-45d3-b60f-ef8dbe589014',
                  },
                },
                {
                  IPSetReferenceStatement: {
                    Arn: 'arn:aws:wafv2:us-east-1:551655797952:global/ipset/security-cloudflare-cloudfront-ipset-v6/68ee77ba-5373-4cc8-b349-56851aa7c27d',
                  },
                },
              ],
            },
          },
          VisibilityConfig: {
            CloudWatchMetricsEnabled: true,
            MetricName: 'AllowCloudFlareIPs',
            SampledRequestsEnabled: true,
          },
        },
      ],
    })
  })

  test('creates CloudFront distribution with custom domain', () => {
    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        DefaultRootObject: 'index.html',
        HttpVersion: 'http2',
        PriceClass: 'PriceClass_200',
        Aliases: ['shadcn.vitalitydesignsystem.com'],
        ViewerCertificate: {
          AcmCertificateArn: 'arn:aws:acm:us-east-1:551655797952:certificate/935f70a7-bd28-4709-91cf-fea4ff0684ff',
          MinimumProtocolVersion: 'TLSv1.2_2021',
          SslSupportMethod: 'sni-only',
        },
      },
    })
  })

  test('creates Origin Access Control', () => {
    template.hasResourceProperties('AWS::CloudFront::OriginAccessControl', {
      OriginAccessControlConfig: {
        OriginAccessControlOriginType: 's3',
        SigningBehavior: 'always',
        SigningProtocol: 'sigv4',
      },
    })
  })

  test('attaches WAF WebACL to CloudFront distribution', () => {
    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        WebACLId: Match.anyValue(),
      },
    })
  })

  test('configures custom error responses', () => {
    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        CustomErrorResponses: [
          {
            ErrorCode: 403,
            ResponseCode: 404,
            ResponsePagePath: '/404.html',
          },
          {
            ErrorCode: 404,
            ResponseCode: 404,
            ResponsePagePath: '/404.html',
          },
        ],
      },
    })
  })

  test('outputs distribution domain name and ID', () => {
    template.hasOutput('DistributionDomainName', {
      Value: Match.anyValue(),
    })
    template.hasOutput('DistributionId', {
      Value: Match.anyValue(),
    })
  })
})
