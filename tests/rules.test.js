import { test } from 'node:test';
import assert from 'node:assert/strict';
import { maxPerItemRule } from '../src/utils/rules.js';

test('maxPerItemRule allows valid quantity below limit (3)', () => {
  const result = maxPerItemRule(3);
  assert.equal(result.allowed, true);
  assert.equal(result.message, '');
});

test('maxPerItemRule allows quantity exactly at limit (5)', () => {
  const result = maxPerItemRule(5);
  assert.equal(result.allowed, true);
  assert.equal(result.message, '');
});

test('maxPerItemRule blocks quantity above limit (6)', () => {
  const result = maxPerItemRule(6);
  assert.equal(result.allowed, false);
  assert.equal(result.message, 'Maximum 5 of the same perfume and size per order.');
});