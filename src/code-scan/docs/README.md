# code-scan

## Introduction

用于扫描代码，支持自定义扫描规则，返回扫描文件结果。

## Usage

``` ts
// usage
import { scanFile } from './src/main';

void scanFile({
  root_path: './src',
  ignore_config_file: '.gitignore',
}).then((res) => {
  console.log(res);
});
```

``` json
// result
[
  '/Users/bytedance/study/rollup-ts-starter/.eslintrc.js',
  '/Users/bytedance/study/rollup-ts-starter/.prettierrc.js',
  '/Users/bytedance/study/rollup-ts-starter/.stylelintrc.js',
  '/Users/bytedance/study/rollup-ts-starter/commitlint.config.js',
  '/Users/bytedance/study/rollup-ts-starter/example/index.ts',
  '/Users/bytedance/study/rollup-ts-starter/jest.config.ts',
  '/Users/bytedance/study/rollup-ts-starter/rollup.config.js',
  '/Users/bytedance/study/rollup-ts-starter/src/code-line/index.ts',
  '/Users/bytedance/study/rollup-ts-starter/src/code-line/types.ts',
  '/Users/bytedance/study/rollup-ts-starter/src/code-scan/config.ts',
  '/Users/bytedance/study/rollup-ts-starter/src/code-scan/index.ts',
  '/Users/bytedance/study/rollup-ts-starter/src/code-scan/types.ts',
  '/Users/bytedance/study/rollup-ts-starter/src/main.ts',
  '/Users/bytedance/study/rollup-ts-starter/test/index.spec.ts',
  '/Users/bytedance/study/rollup-ts-starter/types/index.d.ts'
]
```

### Returns

返回满足条件的文件的绝对路径。

类型：string[]

## Params

### root_path

扫描文件路径。

类型： string

默认值：'.'

### scan_file_type

自定义扫描文件扩展名。

类型： string

默认值：'/**/*.?(js|jsx|ts|tsx|vue)'

### is_open_default_ignore

是否在 glob 里开启默认忽略（glob规则）。

默认值：true

默认开启的 glob ignore 规则：

``` ts
export const DEFAULT_IGNORE_RULES = [
  './node_modules/**/*',
  './build/**/*',
  './dist/**/*',
  './lib/**/*',
  './output/**/*',
  './common_build/**/*',
];
```

### ignore_rules

自定义忽略规则（gitignore规则）。

类型：string[]

默认值：[]

### ignore_config_file

自定义忽略规则配置文件路径，默认为 .gitignore 配置。

默认值：.gitignore

指定为 null 则不启用配置文件
