require('@testing-library/jest-dom');

const { TextEncoder, TextDecoder } = require('util');
const { ReadableStream, TransformStream } = require('node:stream/web');
const { Blob } = require('node:buffer');
const { MessageChannel, MessagePort } = require('node:worker_threads');

Object.assign(globalThis, {
  TextEncoder,
  TextDecoder,
  ReadableStream,
  TransformStream,
  Blob,
  MessageChannel,
  MessagePort,
});

const { fetch, Headers, Request, Response } = require('undici');
Object.assign(globalThis, { fetch, Headers, Request, Response });

const { server } = require('./mocks/server');

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());