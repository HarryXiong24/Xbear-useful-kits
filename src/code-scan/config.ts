// 默认扫描文件
export const FILE_TYPE = '/**/*.?(js|jsx|ts|tsx|vue)';

// 默认忽略的文件夹
export const DEFAULT_IGNORE = [
  '/node_modules/**/*',
  '/build/**/*',
  '/dist/**/*',
  '/lib/**/*',
  '/output/**/*',
  '/common_build/**/*',
];

// ignore 文件名
export const IGNORE_FILE_NAME = '.gitignore';

// 默认参数
export const DEFAULT_PARAM = {
  rootPath: '.',
  ignoreRules: [],
  isDefaultIgnore: true,
  file_type: FILE_TYPE,
  ignoreFileName: IGNORE_FILE_NAME,
};
