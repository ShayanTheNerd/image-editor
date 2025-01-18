import globals from 'globals';
import eslintJS from '@eslint/js';
import process from 'node:process';
import eslintTS from 'typescript-eslint';
import eslintPluginVitest from 'eslint-plugin-vitest';
import eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginStylistic from '@stylistic/eslint-plugin';
import eslintPluginCypress from 'eslint-plugin-cypress/flat';
import eslintPluginPerfectionist from 'eslint-plugin-perfectionist';

/** @typedef {'off' | 'error' | ['error', (string | Record<string, unknown>), ...(Record<string, unknown>)[]] } RuleConfig */

/*** Import ***/
/**
 * @typedef {`import-x/${keyof typeof eslintPluginImportX.rules}`} PerfectionistRule
 * @type {Record<PerfectionistRule, RuleConfig>}
 */
const importRules = {
	'import-x/first': 'error',
	'import-x/group-exports': 'error',
	'import-x/no-absolute-path': 'error',
	'import-x/no-named-as-default': 'error',
	'import-x/newline-after-import': 'error',
	'import-x/no-useless-path-segments': 'error',
	'import-x/extensions': ['error', 'ignorePackages'],
};

/*** Perfectionist ***/
/**
 * @typedef {`perfectionist/${keyof typeof eslintPluginPerfectionist.rules}`} PerfectionistRule
 * @type {Record<PerfectionistRule, RuleConfig>}
 */
const perfectionistRules = {
	'perfectionist/sort-maps': 'error',
	'perfectionist/sort-exports': 'error',
	'perfectionist/sort-union-types': 'error',
	'perfectionist/sort-array-includes': 'error',
	'perfectionist/sort-intersection-types': 'error',
	'perfectionist/sort-named-imports': ['error', { groupKind: 'types-first' }],
	'perfectionist/sort-named-exports': ['error', { groupKind: 'types-first' }],
	'perfectionist/sort-imports': [
		'error',
		{
			environment: 'bun',
			tsconfigRootDir: '.',
			sortSideEffects: true,
			specialCharacters: 'trim',
			customGroups: {
				value: {
					astroComponents: '\\.astro$',
				},
			},
			groups: [
				['side-effect', 'side-effect-style', 'style'],
				['index-type', 'builtin-type', 'external-type', 'internal-type', 'parent-type', 'sibling-type'],
				'astroComponents',
				['index', 'builtin', 'external', 'internal', 'parent', 'sibling'],
				['object', 'unknown'],
			],
		},
	],
};

/*** Stylistic ***/
/**
 * @typedef {`@stylistic/${keyof typeof eslintPluginStylistic.rules}`} StylisticRule
 * @type {Record<StylisticRule, RuleConfig>}
 */
const stylisticRules = {
	...eslintPluginStylistic.configs['recommended-flat'].rules,
	'@stylistic/semi-style': 'error',
	'@stylistic/wrap-regex': 'error',
	'@stylistic/arrow-parens': 'error',
	'@stylistic/no-extra-semi': 'error',
	'@stylistic/spaced-comment': 'off',
	'@stylistic/indent': ['error', 'tab'],
	'@stylistic/linebreak-style': 'error',
	'@stylistic/func-call-spacing': 'error',
	'@stylistic/no-confusing-arrow': 'error',
	'@stylistic/switch-colon-spacing': 'error',
	'@stylistic/type-annotation-spacing': 'error',
	'@stylistic/indent-binary-ops': ['error', 'tab'],
	'@stylistic/lines-between-class-members': 'off',
	'@stylistic/operator-linebreak': ['error', 'none'],
	'@stylistic/generator-star-spacing': ['error', 'after'],
	'@stylistic/nonblock-statement-body-position': 'error',
	'@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
	'@stylistic/array-bracket-newline': ['error', 'consistent'],
	'@stylistic/no-tabs': ['error', { allowIndentationTabs: true }],
	'@stylistic/no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
	'@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
	'@stylistic/function-call-argument-newline': ['error', 'consistent'],
	'@stylistic/semi': ['error', 'always', { omitLastInOneLineBlock: true }],
	'@stylistic/object-curly-newline': ['error', { multiline: true, consistent: true }],
	'@stylistic/lines-around-comment': [
		'error',
		{
			allowTypeStart: true,
			allowEnumStart: true,
			allowClassStart: true,
			allowBlockStart: true,
			allowArrayStart: true,
			allowModuleStart: true,
			allowObjectStart: true,
			allowInterfaceStart: true,
		},
	],
	'@stylistic/member-delimiter-style': [
		'error',
		{
			multilineDetection: 'brackets',
			multiline: { delimiter: 'semi', requireLast: true },
			singleline: { delimiter: 'semi', requireLast: false },
		},
	],
	'@stylistic/padding-line-between-statements': [
		'error',
		{
			prev: '*',
			next: [
				'do',
				'try',
				'for',
				'iife',
				'with',
				'class',
				'block',
				'while',
				'throw',
				'return',
				'switch',
				'export',
				'function',
				'directive',
				'block-like',
				'cjs-export',
				'multiline-block-like',
			],
			blankLine: 'always',
		},
		{
			prev: 'export',
			next: 'export',
			blankLine: 'any',
		},
		{
			prev: ['const', 'let', 'var'],
			next: 'block-like',
			blankLine: 'any',
		},
		{
			prev: 'block-like',
			next: '*',
			blankLine: 'always',
		},
		{
			prev: 'function-overload',
			next: 'function',
			blankLine: 'never',
		},
	],
};

/*** JS ***/
const jsRules = {
	...eslintJS.configs.recommended.rules,

	/* Possible Problems */
	'no-await-in-loop': 'error',
	'no-self-compare': 'error',
	'no-unreachable-loop': 'error',
	'no-inner-declarations': 'error',
	'array-callback-return': 'error',
	'no-useless-assignment': 'error',
	'no-constructor-return': 'error',
	'require-atomic-updates': 'error',
	'no-async-promise-executor': 'error',
	'no-template-curly-in-string': 'error',
	'no-promise-executor-return': 'error',
	'no-unmodified-loop-condition': 'error',
	'no-use-before-define': ['error', 'nofunc'],
	'use-isnan': ['error', { enforceForIndexOf: true }],
	'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
	'no-unsafe-negation': ['error', { enforceForOrderingRelations: true }],
	'no-unsafe-optional-chaining': ['error', { disallowArithmeticOperators: true }],

	/* Suggestions */
	'yoda': 'error',
	'strict': 'error',
	'no-var': 'error',
	'eqeqeq': 'error',
	'no-new': 'error',
	'no-eval': 'error',
	'no-void': 'error',
	'new-cap': 'error',
	'no-proto': 'error',
	'no-caller': 'error',
	'no-empty': 'error',
	'no-eq-null': 'error',
	'camelcase': 'error',
	'sort-imports': 'off',
	'no-redeclare': 'off',
	'complexity': 'error',
	'no-iterator': 'error',
	'no-continue': 'error',
	'no-lonely-if': 'error',
	'max-params': 'error',
	'no-label-var': 'error',
	'no-new-func': 'error',
	'no-multi-str': 'error',
	'guard-for-in': 'error',
	'no-loop-func': 'error',
	'dot-notation': 'error',
	'default-case': 'error',
	'no-script-url': 'error',
	'prefer-const': 'error',
	'no-undefined': 'error',
	'no-undef-init': 'error',
	'require-await': 'error',
	'no-extra-bind': 'error',
	'prefer-spread': 'error',
	'no-lone-blocks': 'error',
	'no-extra-label': 'error',
	'accessor-pairs': 'error',
	'no-useless-call': 'error',
	'max-depth': ['error', 3],
	'no-implied-eval': 'error',
	'consistent-this': 'error',
	'no-octal-escape': 'error',
	'no-throw-literal': 'error',
	'prefer-template': 'error',
	'init-declarations': 'error',
	'no-new-wrappers': 'error',
	'block-scoped-var': 'error',
	'no-extend-native': 'error',
	'default-case-last': 'error',
	'object-shorthand': 'error',
	'no-useless-return': 'error',
	'consistent-return': 'error',
	'no-useless-concat': 'error',
	'no-nested-ternary': 'error',
	'no-useless-rename': 'error',
	'no-implicit-globals': 'error',
	'default-param-last': 'error',
	'symbol-description': 'error',
	'curly': ['error', 'multi-line'],
	'prefer-rest-params': 'error',
	'no-implicit-coercion': 'error',
	'radix': ['error', 'as-needed'],
	'func-name-matching': 'error',
	'operator-assignment': 'error',
	'no-unneeded-ternary': 'error',
	'no-array-constructor': 'error',
	'prefer-destructuring': 'error',
	'no-underscore-dangle': 'error',
	'prefer-object-spread': 'error',
	'no-object-constructor': 'error',
	'prefer-object-has-own': 'error',
	'no-useless-constructor': 'error',
	'class-methods-use-this': 'error',
	'prefer-numeric-literals': 'error',
	'no-useless-computed-key': 'error',
	'max-nested-callbacks': ['error', 3],
	'no-return-assign': ['error', 'always'],
	'prefer-named-capture-group': 'error',
	'no-bitwise': ['error', { int32Hint: true }],
	'prefer-exponentiation-operator': 'error',
	'dot-notation': ['error', { allowKeywords: false }],
	'logical-assignment-operators': ['error', 'always'],
	'no-sequences': ['error', { allowInParentheses: false }],
	'no-multi-assign': ['error', { ignoreNonDeclaration: true }],
	'no-empty-function': ['error', { allow: ['arrowFunctions'] }],
	'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
	'prefer-arrow-callback': ['error', { allowUnboundThis: true }],
	'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
	'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
	'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
	'no-extra-boolean-cast': ['error', { enforceForInnerExpressions: true }],
	'no-shadow': ['error', { builtinGlobals: true, hoist: 'all', allow: ['name'] }],
	'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
	'arrow-body-style': ['error', 'as-needed', { requireReturnForObjectLiteral: true }],
	'no-console': [process.env.NODE_ENV === 'production' ? 'error' : 'off', { allow: ['warn', 'error'] }],
	'no-restricted-exports': [
		'error',
		{
			restrictDefaultExports: {
				named: true,
				namedFrom: true,
				defaultFrom: true,
				namespaceFrom: true,
			},
		},
	],
};

/*** TS ***/
const overriddenESLintJSRules = eslintTS.configs.eslintRecommended.rules;
const tsStrictRules = eslintTS.configs.strict.find(({ name }) => name.endsWith('strict')).rules;
const tsStylisticRules = eslintTS.configs.stylistic.find(({ name }) => name.endsWith('stylistic')).rules;
const tsRules = {
	...overriddenESLintJSRules,
	'no-shadow': 'off',
	'max-params': 'off',
	'no-loop-func': 'off',
	'default-param-last': 'off',
	'no-use-before-define': 'off',

	...tsStrictRules,
	...tsStylisticRules,
	'@typescript-eslint/no-shadow': 'error',
	'@typescript-eslint/max-params': 'error',
	'@typescript-eslint/no-loop-func': 'error',
	'@typescript-eslint/default-param-last': 'error',
	'@typescript-eslint/prefer-enum-initializers': 'error',
	'@typescript-eslint/no-useless-empty-export': 'error',
	'@typescript-eslint/adjacent-overload-signatures': 'off',
	'@typescript-eslint/method-signature-style': ['error', 'method'],
	'@typescript-eslint/consistent-type-definitions': ['error', 'type'],
	'@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
	'@typescript-eslint/no-use-before-define': [
		'error',
		{
			functions: false,
			ignoreTypeReferences: false,
		},
	],
};

/*** Vitest ***/
/**
 * @typedef {keyof typeof eslintPluginVitest.configs.all.rules} VitestRule
 * @type {Record<VitestRule, RuleConfig>}
 */
const vitestRules = {
	...eslintPluginVitest.configs.recommended.rules,
	'vitest/prefer-todo': 'error',
	'vitest/require-hook': 'error',
	'vitest/prefer-to-be': 'error',
	'vitest/prefer-spy-on': 'error',
	'vitest/no-mocks-import': 'error',
	'vitest/no-test-prefixes': 'error',
	'vitest/no-alias-methods': 'error',
	'vitest/no-focused-tests': 'error',
	'vitest/no-disabled-tests': 'error',
	'vitest/prefer-to-contain': 'error',
	'vitest/prefer-called-with': 'error',
	'vitest/prefer-to-be-falsy': 'error',
	'vitest/no-duplicate-hooks': 'error',
	'vitest/prefer-strict-equal': 'error',
	'vitest/no-conditional-tests': 'error',
	'vitest/prefer-to-be-truthy': 'error',
	'vitest/prefer-to-be-object': 'error',
	'vitest/no-standalone-expect': 'error',
	'vitest/no-conditional-expect': 'error',
	'vitest/no-conditional-in-test': 'error',
	'vitest/prefer-to-have-length': 'error',
	'vitest/prefer-hooks-in-order': 'error',
	'vitest/prefer-lowercase-title': 'error',
	'vitest/prefer-equality-matcher': 'error',
	'vitest/consistent-test-filename': 'error',
	'vitest/no-test-return-statement': 'error',
	'vitest/require-to-throw-message': 'error',
	'vitest/prefer-comparison-matcher': 'error',
	'vitest/no-interpolation-in-snapshots': 'error',
	'vitest/prefer-mock-promise-shorthand': 'error',
	'vitest/prefer-snapshot-hint': ['error', 'always'],
	'vitest/max-nested-describe': ['error', { max: 1 }],
	'vitest/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'test' }],
};

/*** Cypress ***/
/**
 * @typedef {`cypress/${keyof typeof eslintPluginCypress.rules}`} CypressRule
 * @type {Record<CypressRule, RuleConfig>}
 */
const cypressRules = {
	...eslintPluginCypress.configs.recommended.rules,
	'cypress/no-force': 'error',
	'cypress/no-pause': 'error',
	'cypress/no-async-tests': 'off',
	'cypress/assertion-before-screenshot': 'error',
};

export default eslintTS.config(
	{
		ignores: [
			'**/.changeset', '**/.vite-inspect',
			'**/__snapshots__', '**/coverage',
			'**/.cache', '**/.vitepress/cache', '**/.history', '**/.idea',
			'**/temp', '**/.temp', '**/tmp', '**/.tmp', '**/vite.config.*.timestamp-*',
			'**/package-lock.json', '**/pnpm-lock.yaml', '**/yarn.lock', '**/bun.lockb',
			'**/.nuxt', '**/.next', '**/.astro', '**/.svelte-kit', '**/.yarn', '**/.vercel', '**/.nx',
			'**/dist', '**/output', '**/.output', '**/*.min.*', '**/env.d.ts', '**/auto-import?(s).d.ts', '**/components.d.ts',
		],
	},
	{
		files: ['**/*.{js,ts}'],
		plugins: {
			'import-x': eslintPluginImportX,
			'@stylistic': eslintPluginStylistic,
			'@typescript-eslint': eslintTS.plugin,
			'perfectionist': eslintPluginPerfectionist,
		},
		languageOptions: {
			parser: eslintTS.parser,
			globals: globals.browser,
		},
		settings: {
			perfectionist: {
				type: 'line-length',
			},
		},
		rules: {
			...importRules,
			...perfectionistRules,
			...stylisticRules,
			...jsRules,
			...tsRules,
		},
	},
	{
		files: ['tests/unit/**/*.test.ts'],
		plugins: {
			vitest: eslintPluginVitest,
		},
		rules: vitestRules,
	},
	{
		files: ['tests/cypress/e2e/**/*.cy.ts'],
		...eslintPluginCypress.configs.recommended,
		rules: cypressRules,
	},
);
