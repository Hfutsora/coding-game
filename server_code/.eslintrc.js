// Please refer to the rules list(http://eslint.org/docs/rules/) to known more about these rules.

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6
    },
    env: {
        node: true,
        es6: true
    },
    rules: {
        // Strict mode
        'strict': [ 'error', 'global' ],
        // Possible errors
        'no-cond-assign': [ 'error', 'always' ],
        // 禁止console.log
        'no-console': [ 'error' ],
        // 条件中禁止常量表达式
        'no-constant-condition': [ 'error' ],
        // 禁止使用debugger
        'no-debugger': [ 'error' ],
        // 函数定义中参数名不能重复
        'no-dupe-args': [ 'error' ],
        // 对象文字量中不能有重复的键
        'no-dupe-keys': [ 'error' ],
        // 禁止重复的case条件
        'no-duplicate-case': [ 'error' ],
        // 禁止空的代码块（{}）
        'no-empty': [ 'error' ],
        // 禁止在catch中对异常对象重新赋值
        'no-ex-assign': [ 'error' ],
        // 禁止不必要的布尔类型转换
        'no-extra-boolean-cast': [ 'error' ],
        // 禁止不必要的分号
        'no-extra-semi': [ 'error' ],
        // 函数定义不能重新赋值
        'no-func-assign': [ 'error' ],
        // 禁止逻辑块内部直接声明函数
        // 禁止逻辑块中使用var定义变量
        'no-inner-declarations': [ 'error', 'both' ],
        // 禁止在字符串外使用特殊空白字符
        'no-irregular-whitespace': [ 'error' ],
        // 禁止将全局对象属性（Math）作为类来使用
        'no-obj-calls': [ 'error' ],
        // 数组定义中（非最后一个元素），禁止使用空元素
        'no-sparse-arrays': [ 'error' ],
        // 禁止无法到达的代码中包含return/throw/continue/break;
        'no-unreachable': [ 'error' ],
        // finally中不能使用流程控制语句
        'no-unsafe-finally': [ 'error' ],
        // 禁止在关系运算符左侧的操作数前使用!（使用小括号）
        'no-unsafe-negation': [ 'error' ],
        // 需要使用isNaN判断数字是否非数
        'use-isnan': [ 'error' ],
        // typeof字符串必须合法
        'valid-typeof': [ 'error' ],
        // Best Practices
        // 如果在类中定义了set访问器，必须有get访问器
        'accessor-pairs': [ 'error' ],
        // 在数组的元素处理方法内（有返回值的）必须要加上返回值
        'array-callback-return': [ 'error' ],
        // 禁止块域内的var
        'block-scoped-var': [ 'error' ],
        // 返回类型具有一致性
        'consistent-return': [ 'error' ],
        // 所有逻辑块必须要有大括号
        'curly': [ 'error' ],
        // switch中必须要有default
        'default-case': [ 'error' ],
        // 强制使用===
        'eqeqeq': [ 'error', 'always' ],
        // 禁止使用arguments.caller和arguments.callee
        'no-caller': [ 'error' ],
        // case中使用部分声明关键字时必须要使用大括号
        'no-case-declarations': [ 'error' ],
        // 禁止在else中使用return（如果else上访的if和else if中不包含return）
        'no-else-return': [ 'error' ],
        // 禁止空函数（函数中有注释的不算空函数）
        'no-empty-function': [ 'error' ],
        // 禁止空的模式解构
        'no-empty-pattern': [ 'error' ],
        // 禁止==null（三等号或者直接转bool）
        'no-eq-null': [ 'error' ],
        // 禁止修改原生类型
        'no-extend-native': [ 'error' ],
        // 禁止不必要的标签
        'no-extra-label': [ 'error' ],
        // 禁止使用无break的case
        'no-fallthrough': [ 'error' ],
        // 禁止在浮点数开头使用小数点
        'no-floating-decimal': [ 'error' ],
        // 禁止给只读的全局变量赋值
        'no-global-assign': [ 'error' ],
        // 禁止隐性类型转换
        'no-implicit-coercion': [ 'error' ],
        // 禁止使用__iterator__属性
        'no-iterator': [ 'error' ],
        // 禁止使用孤立代码块
        'no-lone-blocks': [ 'error' ],
        // 禁止在循环中定义函数（有一定限制）
        'no-loop-func': [ 'error' ],
        // 禁止多余空白字符
        'no-multi-spaces': [ 'error' ],
        // 禁止多行文本
        'no-multi-str': [ 'error' ],
        // 禁止在String Number Boolean等类型上使用new
        'no-new-wrappers': [ 'error' ],
        // 禁止在赋值外使用new
        'no-new': [ 'error' ],
        // 禁止8进制转义
        'no-octal-escape': [ 'error' ],
        // 禁止8进制文字量
        'no-octal': [ 'error' ],
        // 禁止使用__proto__
        'no-proto': [ 'error' ],
        // 禁止重复声明变量
        'no-redeclare': [ 'error' ],
        // 禁止在return语句中赋值
        'no-return-assign': [ 'error' ],
        // 禁止javascript: URL
        'no-script-url': [ 'error' ],
        // 禁止赋值符号左右两侧完全相同
        'no-self-assign': [ 'error' ],
        // 禁止自身比较
        'no-self-compare': [ 'error' ],
        // 禁止逗号表达式
        'no-sequences': [ 'error' ],
        // 禁止抛出文字量
        'no-throw-literal': [ 'error' ],
        // 禁止循环变量在循环中修改循环变量
        'no-unmodified-loop-condition': [ 'error' ],
        // 禁止未使用的表达式
        'no-unused-expressions': [ 'error' ],
        // 禁止未使用的标签
        'no-unused-labels': [ 'error' ],
        // 禁止无用的文字量连接
        'no-useless-concat': [ 'error' ],
        // 禁止无用的转义字符
        'no-useless-escape': [ 'error' ],
        // 禁止void关键字
        'no-void': [ 'error' ],
        // 禁止with关键字
        'no-with': [ 'error' ],
        // 函数表达式一定要有括号包围
        'wrap-iife': [ 'error', 'inside' ],
        // Varaibles
        // 变量声明一定要初始化
        'init-declarations': [ 'error', 'always' ],
        // catch中的异常对象不能隐藏作用域中的其他变量
        'no-catch-shadow': [ 'error' ],
        // 禁止删除变量
        'no-delete-var': [ 'error' ],
        // 禁止标签和变量名相同
        'no-label-var': [ 'error' ],
        // 符号名不能隐藏js的一些内置符号
        'no-shadow-restricted-names': [ 'error' ],
        // 禁止内部变量隐藏外部同名变量
        'no-shadow': [ 'error' ],
        // 禁止使用未声明变量（在/*global */中定义的例外）
        'no-undef': [ 'error' ],
        // 禁止包含未使用的变量
        'no-unused-vars': [ 'error' ],
        // Node.js and CommonJS
        // 必须处理回调中的错误信息
        'handle-callback-err': [ 'error' ],
        // 禁止new和require连用
        'no-new-require': [ 'error' ],
        // 禁止直接拼接__dirname和__filename（必须使用path.join()）
        'no-path-concat': [ 'error' ],
        // Stylistic Issues
        // 单行代码块大括号前后必须有空格
        'block-spacing': [ 'error', 'always' ],
        // 大括号位置使用stroustrup风格
        'brace-style': ['error', 'stroustrup'],
        // 属性名必须用驼峰式
        'camelcase': [ 'error' ],
        // 逗号后必须有空格
        'comma-spacing': [ 'error', {
            before: false,
            after: true
        }],
        // 计算得到属性名的中括号不需要空格
        'computed-property-spacing': [ 'error', 'never' ],
        // self变量必须指向this
        'consistent-this': [ 'error', 'self' ],
        // 函数调用括号内部不需要空格
        'func-call-spacing': [ 'error', 'never' ],
        // 禁止给函数表达式起名
        'func-names': [ 'error', 'never' ],
        // 缩进2空格
        'indent': [ 'error', 4, { MemberExpression: 0 } ],
        // 对象文字量键后冒号前无空格，冒号后必须有空格，只能有一个空格
        'key-spacing': [ 'error' ],
        // 关键字前后必须有空格
        'keyword-spacing': [ 'error' ],
        // 注释一定要放在语句之前
        'line-comment-position': [ 'error' ],
        // 指示符（比如'use strict'）前后必须有空行（如果作用域前没有任何语句，可以不在前面加空行）
        'lines-around-directive': [ 'error', 'always' ],
        // 构造函数首字母大写
        'new-cap': ['error', {
          capIsNew: false
        }],
        // 调用构造函数必须加括号
        'new-parens': [ 'error' ],
        // return前必须有空行
        'newline-before-return': [ 'error' ],
        // 调用链换行缩进4空格
        'newline-per-chained-call': [ 'error', {
            ignoreChainWithDepth: 4
        }],
        // 禁止使用Array构造函数
        'no-array-constructor': [ 'error' ],
        // 禁止使用行内注释
        'no-inline-comments': [ 'error' ],
        // 不同类型二元运算符必须使用括号
        'no-mixed-operators': [ 'error' ],
        // 不能混合使用tab和空格
        'no-mixed-spaces-and-tabs': [ 'error' ],
        // 禁止问号表达式嵌套
        'no-nested-ternary': [ 'error' ],
        // 禁止调用Object构造函数
        'no-new-object': [ 'error' ],
        // 禁止所有tab字符
        'no-tabs': [ 'error' ],
        // 禁止行尾多余空格
        'no-trailing-spaces': [ 'error' ],
        // 在属性前没有空格
        'no-whitespace-before-property': [ 'error' ],
        // 对象左括号后和右括号前必须有空格
        // 但末尾元素是数组和对象例外
        'object-curly-spacing': [ 'error', 'always', {
            arraysInObjects: false,
            objectsInObjects: false,
        }],
        // 对象每个属性必须换行
        'object-property-newline': [ 'error' ],
        // 每行只能定义一个变量
        'one-var-declaration-per-line': [ 'error', 'always' ],
        // 每个var/const/let只能定义一个变量
        'one-var': [ 'error', 'never' ],
        // 在操作符处换行，换行符必须在操作符后
        'operator-linebreak': [ 'error', 'after' ],
        // 块语句开始和结束大括号之间没有空行
        'padded-blocks': [ 'error', 'never' ],
        // 对象属性名只有必要时才加上引号
        'quote-props': [ 'error', 'as-needed' ],
        // 字符串一般用单引号，格式化用模板字符串（``）
        'quotes': [ 'error', 'single', {
            allowTemplateLiterals: true
        }],
        // 单行多条语句时，分号后必须加空格
        'semi-spacing': ['error', {
            'before': false,
            'after': true
        }],
        // 语句结尾一定要加分号
        'semi': [ 'error', 'always' ],
        // 语句块大括号前要加空格
        'space-before-blocks': [ 'error', 'always' ],
        // 函数小括号前不能有空格
        'space-before-function-paren': [ 'error', 'never' ],
        // 内部操作符两侧必须要有空格
        'space-infix-ops': [ 'error' ],
        // 一元操作符前后必须有空格，./+/-/!例外
        'space-unary-ops': ['error', {
            words: true,
            nonwords: true,
            overrides: {
                '.': false,
                '+': false,
                '-': false,
                '!': false
            }
        }],
        // 注释以一个空格开头
        'spaced-comment': [ 'error', 'always' ],
        // ECMAScript6
        // 箭头表达式只有单个参数时不需要用括号，无参数或者有2个及以上参数时需要加括号
        'arrow-parens': [ 'error', 'as-needed' ],
        // 箭头两侧必须有空格
        'arrow-spacing': [ 'error' ],
        // 构造函数必须调用基类构造函数（如果有基类）
        'constructor-super': [ 'error' ],
        // 生成器星号前必须有空格，星号后不能有空格
        'generator-star-spacing': [ 'error' ],
        // class不能被赋值
        'no-class-assign': [ 'error' ],
        // const不能被再次赋值
        'no-const-assign': [ 'error' ],
        // 类中不能有重名成员
        'no-dupe-class-members': [ 'error' ],
        // Symbol不能使用new
        'no-new-symbol': [ 'error' ],
        // super前不能引用this
        'no-this-before-super': [ 'error' ],
        // 不使用不必要的可计算键
        'no-useless-computed-key': [ 'error' ],
        // import/export不做不必要的重命名
        'no-useless-rename': [ 'error' ],
        // 禁止使用var
        'no-var': [ 'error' ],
        // 尽量使用const（赋值后不改变）
        'prefer-const': [ 'error' ],
        // 尽量使用数字文字量而不是parseInt
        'prefer-numeric-literals': [ 'error' ],
        // 尽量使用不定参数而不是arguments
        'prefer-rest-params': [ 'error' ],
        // 尽量使用数组解构而不是apply调用函数
        'prefer-spread': [ 'error' ],
        // 尽量使用模板字符串而不是字符串拼接
        'prefer-template': [ 'error' ],
        // 禁止不使用yield调用生成器函数
        'require-yield': [ 'error' ],
        // ...后不需要空格
        'rest-spread-spacing': ['error', 'never'],
        // Symbol必须有描述
        'symbol-description': [ 'error' ],
        // 模板字符串大括号中间不需要空格
        'template-curly-spacing': ['error', 'never'],
        // yield的星号前有空格，星号后不能加空格
        'yield-star-spacing': ['error', 'before']
    }
};
