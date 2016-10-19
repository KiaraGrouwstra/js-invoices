import * as R from 'ramda';
import { Pipe, PipeTransform, Injectable } from '@angular/core';

export function genPipe(fn: (any) => string, opts: PipeMetadata): PipeTransform {
  let pipe = class implements PipeTransform {
    transform = fn;
  };
  pipe.annotations = [
    new Pipe(opts),
    new Injectable(),
  ];
  return pipe;
}

export let PIPE_PROVIDERS = R.map(({ meta, pipes }) => R.pipe(R.toPairs, ([k,v]) => genPipe(v, R.merge(meta, { name: k })))(pipes))([
  { meta: {}, pipes: {
    // *ngFor='let kv of obj | toKv' -> kv.k, kv.v
    toKv: R.pipe(R.toPairs, R.map(([k,v]) => ({ k, v }))),
    i18n: (s) => s, // TODO: implement locale-based translation, pass `arguments`
  }},
  // { meta: { pure: false }, pipes: {}},
]);
