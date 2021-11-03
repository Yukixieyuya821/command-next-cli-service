module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: 'eslint:recommended',
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        strict: 0,
        'no-console': 0,
        indent: [
            2,
            4,
            {
                SwitchCase: 1
            }
        ],
        quotes: [
            2,
            'single'
        ],
        'jsx-quotes': [
            2,
            'prefer-double'
        ],
        semi: [
            2,
            'always'
        ],
        'no-unused-vars': 1,
        'no-cond-assign': [
            2,
            'except-parens'
        ],
        'no-unsafe-finally': 2,
        'array-callback-return': 2,
        'block-scoped-var': 2,
        curly: [
            2,
            'multi'
        ],
        'dot-notation': 2,
        eqeqeq: [
            2,
            'smart'
        ],
        'no-alert': 2,
        'no-else-return': 2,
        'no-eq-null': 2,
        'no-eval': 2,
        'no-extend-native': 2,
        'no-extra-bind': 2,
        'no-floating-decimal': 2,
        'no-implicit-coercion': 2,
        'no-iterator': 2,
        'no-lone-blocks': 2,
        'no-loop-func': 2,
        'no-multi-spaces': 2,
        'no-multi-str': 2,
        'no-native-reassign': 2,
        'no-new': 2,
        'no-new-func': 2,
        'no-new-wrappers': 2,
        'no-return-assign': 2,
        'no-self-compare': 2,
        'no-sequences': 2,
        'no-throw-literal': 2,
        'no-unmodified-loop-condition': 2,
        'no-unused-expressions': 2,
        'no-useless-call': 2,
        'no-useless-concat': 2,
        'no-useless-escape': 2,
        'no-void': 2,
        'no-with': 2,
        radix: 2,
        'wrap-iife': [
            2,
            'inside'
        ],
        yoda: [
            2,
            'never'
        ],
        'init-declarations': 2,
        'no-use-before-define': 2,
        'handle-callback-err': 2,
        'array-bracket-spacing': 2,
        'block-spacing': 2,
        'brace-style': 2,
        camelcase: 2,
        'comma-spacing': 2,
        'comma-style': 2,
        'computed-property-spacing': 2,
        'eol-last': [
            2,
            'windows'
        ],
        'func-names': 2,
        'func-style': [
            2,
            'expression',
            {
                allowArrowFunctions: true
            }
        ],
        'key-spacing': 2,
        'keyword-spacing': [
            2,
            {
                overrides: {
                    if: {
                        after: false
                    },
                    for: {
                        after: false
                    },
                    while: {
                        after: false
                    },
                    switch: {
                        after: false
                    },
                    catch: {
                        after: false
                    }
                }
            }
        ],
        'max-depth': 2,
        'max-len': [
            1,
            {
                code: 150,
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreUrls: true
            }
        ],
        'max-lines': [
            1,
            {
                max: 500,
                skipBlankLines: true,
                skipComments: true
            }
        ],
        'new-cap': [
            2,
            {
                capIsNew: false
            }
        ],
        'new-parens': 2,
        'newline-after-var': 0,
        'newline-before-return': 0,
        'newline-per-chained-call': [
            2,
            {
                ignoreChainWithDepth: 3
            }
        ],
        'no-array-constructor': 2,
        'no-bitwise': 2,
        'no-lonely-if': 2,
        'no-mixed-operators': 2,
        'no-multiple-empty-lines': 2,
        'no-negated-condition': 2,
        'no-nested-ternary': 2,
        'no-new-object': 2,
        'no-plusplus': [
            2,
            {
                allowForLoopAfterthoughts: true
            }
        ],
        'no-underscore-dangle': 2,
        'no-unneeded-ternary': 2,
        'no-whitespace-before-property': 2,
        'no-trailing-spaces': [
            1,
            {
                skipBlankLines: true
            }
        ],
        'object-curly-spacing': 2,
        'one-var-declaration-per-line': 2,
        'object-property-newline': 2,
        'operator-assignment': 2,
        'operator-linebreak': [
            2,
            'after',
            {
                overrides: {
                    '?': 'before',
                    ':': 'before'
                }
            }
        ],
        'padded-blocks': [
            2,
            'never'
        ],
        'quote-props': [
            'error',
            'as-needed',
            {
                keywords: false,
                unnecessary: true,
                numbers: true
            }
        ],
        'semi-spacing': 2,
        'space-before-blocks': 2,
        'space-before-function-paren': [
            2,
            'never'
        ],
        'space-in-parens': 2,
        'space-infix-ops': 2,
        'space-unary-ops': [
            2,
            {
                words: true,
                nonwords: false
            }
        ],
        'unicode-bom': 1,
        'arrow-body-style': 2,
        'arrow-parens': [
            2,
            'as-needed'
        ],
        'arrow-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        'no-duplicate-imports': 2,
        'no-restricted-imports': 2,
        'no-useless-computed-key': 2,
        'no-useless-constructor': 2,
        'no-useless-rename': 2,
        'no-var': 2,
        'object-shorthand': [
            2,
            'always'
        ],
        'prefer-arrow-callback': 2,
        'prefer-const': 2,
        'prefer-rest-params': 2,
        'prefer-spread': 2,
        'prefer-template': 2,
        'template-curly-spacing': 2
    },
};
