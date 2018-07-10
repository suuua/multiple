module.exports = {
    // 此为根配置，不再向上寻找
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        // 想要使用的 ECMAScript 版本
        ecmaVersion: 7,
        // 代码是 ECMAScript 模块
        sourceType: 'module' 
    },
    env: {
      browser: true,
      es6: true
    },
    extends: "eslint:recommended",
    rules: {
        /* 这是一些可能 导致错误/错误 的语句检测 */
        "no-console": 0,
        "no-debugger": 0,
        "no-dupe-keys": 1,
        // 禁止出现空语句块
        "no-empty": 1,
        // 不必要的布尔转换
        "no-extra-boolean-cast": 1,
        // 强制把变量的使用限制在其定义的作用域范围内
        "block-scoped-var": 2,
        // 控制语句使用括号
        "curly": 2,
        // 强制在点号之前和之后一致的换行
        "dot-location": [1, "property"],
        "no-alert": 2,
        // 禁用 arguments.caller 或 arguments.callee
        "no-caller": 1,
        // 禁止扩展原生类型
        "no-extend-native": 2,
        // 在全局范围内使用变量声明和 function 声明
        "no-implicit-globals": 1,
        // 循环中出现 function 声明和表达式
        "no-loop-func": 1,
        // 要求使用 Error 对象作为 Promise 拒绝的原因
        "prefer-promise-reject-errors": 2,
        // 要求所有的 var 声明出现在它们所在的作用域顶部
        // "vars-on-top": 2,
        // 禁止在变量定义之前使用它们  函数有可能会循环调用，比如a调用b，b调用a 此时调用会报错
        // "no-use-before-define": 2,
        // 未声明的变量，除非它们在 /*global */ 注释中被提到或全局配置
        "no-undef": 1,

        /* 下面是关于风格指南的 */
        // 强制数组方括号中使用一致的空格。此处风格指南没有找到合适的
        // "array-bracket-spacing": 0,
        // 代码块中使用一致的大括号风格
        "brace-style": [2, "1tbs", { "allowSingleLine": true }],
        // 使用驼峰命名，不强制属性名为驼峰
        "camelcase": [2, { properties: "never" }],
        // 在逗号后使用空格
        "comma-spacing": [2, { "before": false, "after": true }],
        // 逗号在末尾
        "comma-style": [2, "last"],
        // 作用域名为self
        "consistent-this": [2, "self"],
        // 调用函数名与参数列表之间不要空格
        "func-call-spacing": [2, "never"],
        // 缩进4个空格
        "indent": [2, 2, {SwitchCase: 1}],
        // 对象字面量键值空格
        "key-spacing": [2, { mode: "minimum" }],
        // 关键字前后空格
        "keyword-spacing": 2,
        // 块语句最大深度为4
        "max-depth": [2, 4],
        // 回调函数深度最大为10
        "max-nested-callbacks": [2, 10],
        // 三元操作符
        "multiline-ternary": [2, "always-multiline"],
        // 要求构造函数首字母大写
        //"new-cap": 2,
        // 无参构造函数有括号
        "new-parens": 2,
        // 混合使用不同的操作符 需要使用括号
        "no-mixed-operators": 2,
        // 属性前有空白
        "no-whitespace-before-property": 2,
        // 花括号内换行符的一致性
        // "object-curly-newline": [2, { "multiline": true }],
        // 花括号内一致的空格  never|always
        "object-curly-spacing": 0,
        // var 声明变量每个函数只有一个,let const 等块级作用域的可以多个
        "one-var": [0, { "var": "always" }],
        // 换行操作符在前面
        "operator-linebreak": [2, "before"],
        // 尽量使用双引号 特殊情况下反勾号 也可使用
        "quotes": 2,
        // 语句末尾有分号
        "semi": 2,
        // 分号之后有空格 分号之前没空格 for(i; i < len; i++)
        "semi-spacing": 2,
        // 分号强制在末尾
        "semi-style": 2,
        // 块语句必须总是至少有一个前置空格
        "space-before-blocks": 2,
        // 函数名和参数列表之间不能有空格
        "space-before-function-paren": [2, {named: "never"}],
        // 中缀操作符周围有空格
        "space-infix-ops": 2,
        // 强制一元操作符空格一致性
        "space-unary-ops": 2,
        // switch case语句冒号空格
        "switch-colon-spacing": 0
    },
    globals: {
        "define": false,
        "$": false,
        "juicer": false,
        "echarts": false,
        "layer": false
    }
};