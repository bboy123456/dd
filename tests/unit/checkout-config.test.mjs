import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { isCheckoutEnabled, isCommerceLive } from "../../lib/config.ts";

const original = {
  COMMERCE_MODE: process.env.COMMERCE_MODE,
  CHECKOUT_ENABLED: process.env.CHECKOUT_ENABLED,
};
afterEach(() => {
  for (const [name, value] of Object.entries(original)) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
});

test("missing and disabled configuration keeps checkout closed", () => {
  delete process.env.COMMERCE_MODE;
  delete process.env.CHECKOUT_ENABLED;
  assert.equal(isCommerceLive(), false);
  assert.equal(isCheckoutEnabled(), false);
  process.env.COMMERCE_MODE = "demo";
  process.env.CHECKOUT_ENABLED = "false";
  assert.equal(isCommerceLive(), false);
  assert.equal(isCheckoutEnabled(), false);
});

test("dashboard whitespace and case do not block explicitly enabled checkout", () => {
  process.env.COMMERCE_MODE = " LIVE \r\n";
  process.env.CHECKOUT_ENABLED = " TRUE\n";
  assert.equal(isCommerceLive(), true);
  assert.equal(isCheckoutEnabled(), true);
});

test("flags are read on each call, including disabling a warm instance", () => {
  process.env.COMMERCE_MODE = "live";
  process.env.CHECKOUT_ENABLED = "true";
  assert.equal(isCommerceLive() && isCheckoutEnabled(), true);
  process.env.CHECKOUT_ENABLED = "false";
  assert.equal(isCheckoutEnabled(), false);
  process.env.COMMERCE_MODE = "demo";
  assert.equal(isCommerceLive(), false);
});

test("unexpected values never silently enable sales", () => {
  for (const value of ["", "1", "yes", '"true"', "true=false"]) {
    process.env.CHECKOUT_ENABLED = value;
    assert.equal(isCheckoutEnabled(), false, value);
  }
  process.env.COMMERCE_MODE = '"live"';
  assert.equal(isCommerceLive(), false);
});
