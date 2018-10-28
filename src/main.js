/**
 * Semantic Versioning 2.0.0 utility library.
 * https://github.com/BrunoRB/semverjs MIT License.
 */
(function() {
	'use strict';

	var patterns = {
		/**
		 * https://semver.org/#spec-item-2
		 */
		majorMinorPatch: '(\\d|[1-9]\\d*)\\.(\\d|[1-9]\\d*)\\.(\\d|[1-9]\\d*)',

		/**
		 * https://semver.org/#spec-item-9
		 */
		preRelease: '(-(?:' +
			'(?:0|[1-9][0-9A-Za-z-]*|[A-Za-z-][0-9A-Za-z-]*)' +
			'(?:\\.(?:[1-9][0-9A-Za-z-]*|[A-Za-z-][0-9A-Za-z-]*|0))*' +
		'))?',

		/**
		 * https://semver.org/#spec-item-10
		 */
		buildMetadata: '(\\+[0-9A-Za-z-]+(?:\\.[0-9A-Za-z-]+)*)?'
	};

	var SemverJS = {

		pattern: new RegExp(
			'^' +
			patterns.majorMinorPatch +
			patterns.preRelease +
			patterns.buildMetadata +
			'$'
		),

		split: function(ver, asArray) {
			var m = ver.match(this.pattern);
			if (!m) {
				throw 'Invalid semver: ' + ver;
			}

			if (!asArray) {
				return {
					major: m[1],
					minor: m[2],
					patch: m[3],
					preRelease: m[4] !== undefined ? m[4].substring(1) : null,
					buildMetadata: m[5] !== undefined ? m[5].substring(1) : null,
				};
			}
			else {
				return [
					m[1], m[2], m[3],
					m[4] !== undefined ? m[4].substring(1) : null,
					m[5] !== undefined ? m[5].substring(1) : null
				];
			}
		},

		isValid: function(semver) {
			return this.pattern.test(semver);
		},

		/**
		 * https://semver.org/#spec-item-11
		 *
		 * @param {string} a https://semver.org/#summary
		 * @param {sring} b https://semver.org/#summary
		 * @returns {Number} 0 if equal, -1 if a less than b, 1 else
		*/
		compare: function (a, b) {
			var sa = this.split(a);
			var sb = this.split(b);

			['major', 'minor', 'patch'].forEach(function(key) {
				sa[key] = parseInt(sa[key], 10);
				sb[key] = parseInt(sb[key], 10);
			});

			if (sa.major != sb.major) {
				return sa.major < sb.major ? -1 : 1;
			}
			else if (sa.minor != sb.minor) {
				return sa.minor < sb.minor ? -1 : 1;
			}
			else if (sa.patch != sb.patch) {
				return sa.patch < sb.patch ? -1 : 1;
			}
			else if (sa.preRelease && sb.preRelease) {
				var isDigit = /\d+/;
				var preA = sa.preRelease.split('.');
				var preB = sb.preRelease.split('.');

				for (var i=0; i<preA.length; i++) {
					var va = preA[i];
					var vb = preB[i];

					// equal until now and a has more fields
					if (i + 1 > preB.length) {
						return 1;
					}
					else if (isDigit.test(va) && isDigit.test(vb)) {
						va = parseInt(va, 10);
						vb = parseInt(vb, 10);
						if (va < vb) {
							return -1;
						}
						else if (va > vb) {
							return 1;
						}
					}
					// "Numeric identifiers always have lower precedence than non-numeric identifiers."
					else if (isDigit.test(va)) {
						return -1;
					}
					else if (isDigit.test(vb)) {
						return 1;
					}
					// lexicographic comparison
					else if (va < vb) {
						return -1;
					}
					else if (va > vb) {
						return 1;
					}
				}

				if (preB.length > preA.length) {
					return -1;
				}
			}
			// pre-release has lower precedence
			else if (sa.preRelease) {
				return -1;
			}
			else if (sb.preRelease) {
				return 1;
			}

			return 0;
		}
	};

	if (typeof module === 'undefined') {
		window.SemverJS = SemverJS;
	}
	else {
		module.exports = SemverJS;
	}
})();