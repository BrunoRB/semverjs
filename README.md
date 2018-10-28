# semverjs

Semantic Versioning 2.0.0 utility library:
 - Comparison
 - Validation
 - Split

## Installing / Running

`yarn install @brunorb/semverjs`

||

`npm install @brunorb/semverjs`

### Node.JS:

    const SemverJS = require('@brunorb/semverjs');

### Browser:

    <script src="@brunorb/semverjs/src/main.js"><script>`
    <script>
    SemverJS...
    </script>


## API

### isValid(_semver_)

	let v1 = '1.2.0-alpha+001';
	let v2 = '1.2.1';
    SemverJS.isValid(v1); // true
    SemverJS.isValid(v2); // true
    SemverJS.isValid('1.1'); // false

### split(_semver_, _asArray = false_)

	let v1 = '1.2.0-alpha+001';
	let v2 = '1.2.1+001';

	SemverJS.split(v1); // {major: '1', minor: '2', patch: '0', preRelease: 'alpha', 'buildMetadata': '001'}
	SemverJS.split(v2); // {major: '1', minor: '2', patch: '1', preRelease: null, buildMetadata: '001'}

	SemverJS.split(v1, true); // ['1', '2', '0', 'alpha', '001']
	SemverJS.split(v2, true); // ['1', '2', '1', null, '001']

### compare(_semver1_, _semver2_)

	let v1 = '1.2.0-alpha+001';
	let v2 = '1.2.1';

	SemverJS.compare(v1, v2); // -1
	SemverJS.compare(v2, v1); // 1
	SemverJS.compare(v1, v1); // 0

### pattern -> _regex_

	SemverJS.pattern.test("semver");
	SemverJS.pattern.match("semver");
	... other regex methods


## Tests

[test/BasicTest.js](test/BasicTest.js)

`yarn run test`

`yarn run lint`

## License

[The MIT License](LICENSE)