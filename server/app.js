/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.lambdaHandler = async (event, context) => {
  const awsServerlessExpress = require('aws-serverless-express')
  const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

  const express = require('express')
  const { Nuxt } = require('nuxt')
  const app = express()

  // Import and Set Nuxt.js options
  const config = require('../nuxt.config.js')
  config.dev = process.env.NODE_ENV !== 'production'

  const nuxt = new Nuxt(config)

  app.use(nuxt.render)
  app.use(awsServerlessExpressMiddleware.eventContext())

  const server = awsServerlessExpress.createServer(app)

  return await awsServerlessExpress.proxy(server, event, context)
}
