import path from 'path';
import fs from 'fs';
import glob from 'glob';
import ignore from 'ignore';
import { DEFAULT_PARAM } from './config';
import { DefaultParam } from './types';

/**
 * @param {string} rootPath 根目录
 * @param {string} fileType 文件类型
 * @param {boolean} isDefaultIgnore 是否开启默认忽略
 * @return {*}
 * @description: 获取使用 glob 扫描的文件列表
 */
export function globScan(
  root_path: string,
  scan_file_type: string,
  is_open_default_ignore: boolean,
  ignore_rules: string[]
): Promise<string[]> {
  console.log(`${root_path}${scan_file_type}`);
  return new Promise((resolve) => {
    glob(
      `${root_path}${scan_file_type}`,
      { dot: true, ignore: is_open_default_ignore ? ignore_rules : [] },
      (err, files) => {
        // 打印错误并退出
        if (err) {
          console.log(err);
          process.exit(1);
        }
        resolve(files);
      }
    );
  });
}

/**
 * @param {string} ignoreFileName 配置文件名
 * @return {*} 返回数组
 * @description: 加载 ignore 配置文件，并处理成数组
 */
function loadingIgnoreConfigFile(ignore_config_file: string) {
  // __dirname 获得当前执行文件所在目录的完整目录名
  // __filename 获得当前执行文件的带有完整绝对路径的文件名
  // process.cwd() 获得当前执行 node 命令时候的文件夹目录名
  const ignorePath = path.resolve(process.cwd(), ignore_config_file);
  try {
    const ignores = fs.readFileSync(ignorePath, 'utf8');
    return ignores.split(/[\n\r]|\n\r/).filter((pattern) => Boolean(pattern));
  } catch (e) {
    return [];
  }
}

/**
 * 根据 ignore 配置过滤文件列表
 * @param {*} files
 * @param {*} ignorePatterns
 * @param {*} cwd
 */
function filterFilesByIgnore(
  files: string[],
  ignore_configs: string[],
  ignore_rules: string[],
  cwd = process.cwd()
) {
  const ig = ignore().add([...ignore_configs, ...ignore_rules]);
  const filtered = files
    .map((raw) => (path.isAbsolute(raw) ? raw : path.resolve(cwd, raw)))
    .map((raw) => path.relative(cwd, raw))
    .filter((filePath) => !ig.ignores(filePath))
    .map((raw) => path.resolve(cwd, raw));
  return filtered;
}

/**
 * 执行扫描
 * @param {*} path 扫描路径 - 默认为当前路径
 */
export async function scan(config: Partial<DefaultParam>) {
  const param: DefaultParam = Object.assign(DEFAULT_PARAM, config);

  const {
    root_path,
    scan_file_type,
    is_open_default_ignore,
    ignore_rules,
    ignore_config_file,
  } = param;

  // 用于改变当前工作目录
  process.chdir(root_path);

  const ignoreConfigs = loadingIgnoreConfigFile(ignore_config_file);

  const files = await globScan(
    root_path,
    scan_file_type,
    is_open_default_ignore,
    ignore_rules
  );

  return filterFilesByIgnore(files, ignoreConfigs, ignore_rules);
}
