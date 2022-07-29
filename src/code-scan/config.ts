import { DefaultParam } from './types';

// 默认的根路径
const ROOT_PATH = '.';

// 默认扫描文件
const SCAN_FILE_TYPE = '/**/*.?(js|jsx|ts|tsx|vue)';

// 默认 ignore 文件名
const IGNORE_CONFIG_FILE = '.gitignore';

// 默认忽略的文件规则
const IGNORE_RULES = [
  '/node_modules/**/*',
  '/build/**/*',
  '/dist/**/*',
  '/lib/**/*',
  '/output/**/*',
  '/common_build/**/*',
];

// 默认参数
export const DEFAULT_PARAM: DefaultParam = {
  root_path: ROOT_PATH,
  ignore_rules: IGNORE_RULES,
  is_open_default_ignore: true,
  scan_file_type: SCAN_FILE_TYPE,
  ignore_config_file: IGNORE_CONFIG_FILE,
};
