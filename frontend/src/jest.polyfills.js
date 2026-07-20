const { TextEncoder, TextDecoder } = require('util');
const { ReadableStream, TransformStream } = require('stream/web');
const { MessageChannel, MessagePort } = require('worker_threads');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.ReadableStream = ReadableStream;
global.TransformStream = TransformStream; 
global.MessageChannel = MessageChannel;
global.MessagePort = MessagePort;

global.fetch = global.fetch || (typeof fetch !== 'undefined' ? fetch : null);
global.Headers = global.Headers || (typeof Headers !== 'undefined' ? Headers : null);
global.Request = global.Request || (typeof Request !== 'undefined' ? Request : null);
global.Response = global.Response || (typeof Response !== 'undefined' ? Response : null);
global.FormData = global.FormData || (typeof FormData !== 'undefined' ? FormData : null);
global.Blob = global.Blob || (typeof Blob !== 'undefined' ? Blob : null);
global.File = global.File || (typeof File !== 'undefined' ? File : null);