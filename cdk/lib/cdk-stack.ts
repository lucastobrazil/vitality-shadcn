import { BaseStack } from '@genie-engineering/cdk-lib'
import * as cdk from 'aws-cdk-lib'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as wafv2 from 'aws-cdk-lib/aws-wafv2'
import { Construct } from 'constructs'

interface CdkStackProps extends cdk.StackProps {
  bucketName: string
  cloudflareIpSetArn: string
  cloudflareIpSetV6Arn: string
  domainName: string
  certificateArn: string
}

export class CdkStack extends BaseStack {
  public readonly bucket: s3.Bucket
  public readonly distribution: cloudfront.Distribution

  constructor(scope: Construct, id: string, props: CdkStackProps) {
    super(scope, id, props)

    this.bucket = new s3.Bucket(this, 'AssetsBucket', {
      bucketName: props.bucketName,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      autoDeleteObjects: false,
    })

    const webAcl = new wafv2.CfnWebACL(this, 'WebACL', {
      defaultAction: { block: {} },
      scope: 'CLOUDFRONT',
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: 'shadcn-waf',
        sampledRequestsEnabled: true,
      },
      rules: [
        {
          name: 'AllowCloudFlareIPs',
          priority: 0,
          action: { allow: {} },
          statement: {
            orStatement: {
              statements: [
                {
                  ipSetReferenceStatement: {
                    arn: props.cloudflareIpSetArn,
                  },
                },
                {
                  ipSetReferenceStatement: {
                    arn: props.cloudflareIpSetV6Arn,
                  },
                },
              ],
            },
          },
          visibilityConfig: {
            cloudWatchMetricsEnabled: true,
            metricName: 'AllowCloudFlareIPs',
            sampledRequestsEnabled: true,
          },
        },
      ],
    })

    const certificate = acm.Certificate.fromCertificateArn(this, 'Certificate', props.certificateArn)
    const s3Origin = origins.S3BucketOrigin.withOriginAccessControl(this.bucket)

    const urlRewriteFunction = new cloudfront.Function(this, 'UrlRewriteFunction', {
      code: cloudfront.FunctionCode.fromInline(`
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // If URI ends with '/', append index.html
  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  }
  // If URI has no file extension, append .html
  else if (!uri.includes('.')) {
    request.uri += '.html';
  }

  return request;
}
      `.trim()),
      runtime: cloudfront.FunctionRuntime.JS_2_0,
    })

    this.distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        origin: s3Origin,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        functionAssociations: [
          {
            function: urlRewriteFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
      domainNames: [props.domainName],
      certificate,
      defaultRootObject: 'index.html',
      httpVersion: cloudfront.HttpVersion.HTTP2,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_200,
      webAclId: webAcl.attrArn,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
        },
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: '/404.html',
        },
      ],
    })

    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: this.distribution.distributionDomainName,
      description: 'CloudFront distribution domain name',
    })

    new cdk.CfnOutput(this, 'DistributionId', {
      value: this.distribution.distributionId,
      description: 'CloudFront distribution ID',
    })
  }
}
