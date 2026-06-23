const { TextDecoder, TextEncoder } = require('node:util');
const v8 = require('node:v8');

/*
	 After migration to Angular 17.1 an error "TextEncoder is not defined" started to appear
	 in Jest tests that use "@angular-devkit/schematics" package. Ideally, this should be fixed
	 in the package itself, but for now, this is a workaround.
	 TODO: Check if this is still needed after updating Nx packages.
 */

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
});

/*
	 After updating to Angular 22, "structuredClone is not defined" started to appear in Jest
	 tests that use "@angular-devkit/schematics", for the same reason as above: Jest's "node"
	 test environment doesn't expose every Node global. structuredClone isn't reachable as a
	 module export, so it's reimplemented here via v8's own (de)serializer.
 */
if (typeof globalThis.structuredClone === 'undefined') {
  Object.defineProperty(globalThis, 'structuredClone', {
    value: (value) => v8.deserialize(v8.serialize(value)),
  });
}
