'use strict';

const assert = require('assert');
const path = require('path');
const SemVer = require(path.join(__dirname, '..', 'src/main'));
const {valid, invalid, split, compare} = require('./test.json');

describe('isValid', function() {
	valid.forEach(v => {
		it(`should assert that ${v} is a valid semver `, async function() {
			assert.ok(SemVer.isValid(v));
		});
	});

	invalid.forEach(v => {
		it(`should assert that ${v} is an invalid semver `, async function() {
			assert.ok(!SemVer.isValid(v));
		});
	})
});

describe('split', function() {
	for (let v in split) {
		it(`should split ${v} in [MAJOR, MINOR, PATCH, PRE-RELEASE, BUILD]`, async function() {
			let expectedObj = {};
			['major', 'minor', 'patch', 'preRelease', 'buildMetadata'].forEach((key, i) => {
				expectedObj[key] = split[v][i];
			});
			// as object
			assert.deepEqual(expectedObj, SemVer.split(v));

			let expectedArray = split[v];
			// as array
			assert.deepEqual(expectedArray, SemVer.split(v, true));
		});
	}
});

describe('compare', function() {
	for (let i=0; i<compare.length; i++) {
		for (let j=i+1; j<compare.length; j++) {
			let a = compare[i];
			let b = compare[j];
			it(`should ensure that ${a} < ${b} (returns -1)`, async function() {
				assert.equal(-1, SemVer.compare(a, b));
			});
		}
	}

	for (let i=compare.length-1; i>=0; i--) {
		for (let j=i-1; j>=0; j--) {
			let a = compare[i];
			let b = compare[j];
			it(`should ensure that ${a} > ${b} (returns 1)`, async function() {
				assert.equal(1, SemVer.compare(a, b));
			});
		}
	}

	for (let i=0; i<compare.length; i++) {
		var a = compare[i];
		it(`should ensure that ${a} = ${a} (returns 0)`, async function() {
			assert.equal(0, SemVer.compare(a, a));
		});
	}
});