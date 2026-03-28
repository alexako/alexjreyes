---
title: Serverless Web Crawler
description: AWS serverless web scraping pipeline with Lambda, SQS, and SNS using infrastructure-as-code
date: '2024-01-31'
linkCode: 'https://github.com/alexako/serverless-web-crawler'
category: Backend
tags: python,aws,typescript
---

A serverless web scraping architecture deployed via AWS CDK. An SNS topic fans out to an SQS queue which triggers Lambda functions for processing. The companion TypeScript client handles submission and result retrieval. Infrastructure is fully defined as code — deploy with a single CDK command.
