# code-line

## Introduction

用于扫描项目中代码行数，返回扫描结果和数据统计综述。

## Usage

``` ts
// usage
import { scanLine } from './src/main';

void scanLine({
  ignore_config_file: '.gitignore',
}).then((res) => {
  console.log(res);
});
```

``` json
// result
{
  summary: [
    {
      name: 'All',
      files: 15,
      allLine: 771,
      codeLine: 665,
      blankLine: 106
    },
    {
      name: 'ts',
      codeLine: 442,
      blankLine: 98,
      allLine: 540,
      files: 10
    },
    { name: 'js', codeLine: 223, blankLine: 8, allLine: 231, files: 5 }
  ],
  detail: [
    {
      fileName: '.eslintrc.js',
      filePath: '/Users/bytedance/study/rollup-ts-starter/.eslintrc.js',
      fileType: 'js',
      codeLine: 101,
      blankLine: 2,
      allLine: 103
    },
    {
      fileName: '.prettierrc.js',
      filePath: '/Users/bytedance/study/rollup-ts-starter/.prettierrc.js',
      fileType: 'js',
      codeLine: 14,
      blankLine: 1,
      allLine: 15
    },
    {
      fileName: '.stylelintrc.js',
      filePath: '/Users/bytedance/study/rollup-ts-starter/.stylelintrc.js',
      fileType: 'js',
      codeLine: 39,
      blankLine: 1,
      allLine: 40
    },
    {
      fileName: 'commitlint.config.js',
      filePath: '/Users/bytedance/study/rollup-ts-starter/commitlint.config.js',
      fileType: 'js',
      codeLine: 23,
      blankLine: 0,
      allLine: 23
    },
    {
      fileName: 'index.ts',
      filePath: '/Users/bytedance/study/rollup-ts-starter/example/index.ts',
      fileType: 'ts',
      codeLine: 13,
      blankLine: 3,
      allLine: 16
    },
    {
      fileName: 'jest.config.ts',
      filePath: '/Users/bytedance/study/rollup-ts-starter/jest.config.ts',
      fileType: 'ts',
      codeLine: 141,
      blankLine: 56,
      allLine: 197
    },
    {
      fileName: 'rollup.config.js',
      filePath: '/Users/bytedance/study/rollup-ts-starter/rollup.config.js',
      fileType: 'js',
      codeLine: 46,
      blankLine: 4,
      allLine: 50
    },
    {
      fileName: 'index.ts',
      filePath: '/Users/bytedance/study/rollup-ts-starter/src/code-line/index.ts',
      fileType: 'ts',
      codeLine: 132,
      blankLine: 12,
      allLine: 144
    },
    {
      fileName: 'types.ts',
      filePath: '/Users/bytedance/study/rollup-ts-starter/src/code-line/types.ts',
      fileType: 'ts',
      codeLine: 8,
      blankLine: 1,
      allLine: 9
    },
    {
      fileName: 'config.ts',
      filePath: '/Users/bytedance/study/rollup-ts-starter/src/code-scan/config.ts',
      fileType: 'ts',
      codeLine: 24,
      blankLine: 6,
      allLine: 30
    },
    {
      fileName: 'index.ts',
      filePath: '/Users/bytedance/study/rollup-ts-starter/src/code-scan/index.ts',
      fileType: 'ts',
      codeLine: 109,
      blankLine: 14,
      allLine: 123
    },
    {
      fileName: 'types.ts',
      filePath: '/Users/bytedance/study/rollup-ts-starter/src/code-scan/types.ts',
      fileType: 'ts',
      codeLine: 7,
      blankLine: 1,
      allLine: 8
    },
    {
      fileName: 'main.ts',
      filePath: '/Users/bytedance/study/rollup-ts-starter/src/main.ts',
      fileType: 'ts',
      codeLine: 3,
      blankLine: 2,
      allLine: 5
    },
    {
      fileName: 'index.spec.ts',
      filePath: '/Users/bytedance/study/rollup-ts-starter/test/index.spec.ts',
      fileType: 'ts',
      codeLine: 4,
      blankLine: 2,
      allLine: 6
    },
    {
      fileName: 'index.d.ts',
      filePath: '/Users/bytedance/study/rollup-ts-starter/types/index.d.ts',
      fileType: 'ts',
      codeLine: 1,
      blankLine: 1,
      allLine: 2
    }
  ]
}
```

### Returns

返回返回扫描结果和数据统计综述。

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
