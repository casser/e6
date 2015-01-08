// Copyright 2012 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var MODULE_TYPES = ['amd', 'commonjs', 'instantiate', 'inline', 'register'];

export class Options {
    static get DEFAULTS() {
        return {
            annotations             : true,
            arrayComprehension      : true,
            arrowFunctions          : true,
            asyncFunctions          : false,
            blockBinding            : false,
            classes                 : true,
            commentCallback         : true,
            computedPropertyNames   : true,
            debug                   : true,
            defaultParameters       : true,
            destructuring           : false,
            exponentiation          : true,
            forOf                   : true,
            freeVariableChecker     : true,
            generatorComprehension  : true,
            generators              : true,
            memberVariables         : true,
            moduleName              : true,
            modules                 : 'register',
            numericLiterals         : true,
            outputLanguage          : 'es5',
            propertyMethods         : true,
            propertyNameShorthand   : true,
            referrer                : '',
            require                 : true,
            restParameters          : true,
            script                  : true,
            sourceMaps              : true,
            spread                  : true,
            symbols                 : true,
            templateLiterals        : true,
            typeAssertionModule     : null,
            typeAssertions          : true,
            types                   : true,
            unicodeEscapeSequences  : true,
            unicodeExpressions      : true,
            validate                : false
        }
    }
    static get MODULES() {
        return ['amd', 'commonjs', 'instantiate', 'inline', 'register']
    }
    static get SOURCEMAPS() {
        return ['inline','file']
    }
    constructor(options={}) {
        for (var key in Options.DEFAULTS) {
            this[key] = options[key] || Options.DEFAULTS[key];
        }
    }
}

