import path from 'path';
import fs from 'fs';
import glob from 'glob';
import ignore from 'ignore';
import { DEFAULT_IGNORE_RULES, DEFAULT_PARAM } from './config';
import { DefaultParam } from './types';

/**
 * @param {string} root_path 根目录
 * @param {string} scan_file_type 过滤的文件类型
 * @param {boolean} is_open_default_ignore 是否开启默认忽略
 * @return {*}
 * @description: 获取使用 glob 扫描的文件列表
 */
function globScan(
  root_path: string,
  scan_file_type: string,
  is_open_default_ignore: boolean
): Promise<string[]> {
  // console.log('globScanPath', `${root_path}${scan_file_type}`);
  return new Promise((resolve) => {
    glob(
      `${root_path}${scan_file_type}`,
      { dot: true, ignore: is_open_default_ignore ? DEFAULT_IGNORE_RULES : [] },
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
 * @param {string} ignore_config_file 配置文件名
 * @return {*} 返回数组
 * @description: 加载 ignore 配置文件，并处理成数组
 */
function loadingIgnoreConfigFile(ignore_config_file: string) {
  // __dirname 获得当前执行文件所在目录的完整目录名
  // __filename 获得当前执行文件的带有完整绝对路径的文件名
  // process.cwd() 获得当前执行 node 命令时候的文件夹目录名
  const ignorePath = path.resolve(process.cwd(), ignore_config_file);
  // console.log('ignorePath', ignorePath);
  try {
    const ignores = fs.readFileSync(ignorePath, 'utf8');
    // filter 的作用是过滤匹配到的 '' 字符串
    return ignores.split(/[\n\r]|\n\r/).filter((item) => Boolean(item));
  } catch (err) {
    console.log('globScanError', err);
    return [];
  }
}

/**
 * @param {string} files 传入的过滤结果
 * @param {string} ignore_configs 配置文件过滤规则
 * @param {string} ignore_rules 忽略的过滤规则
 * @param {*} cwd 当前执行 node 命令时候的文件夹目录名
 * @return {*}
 * @description: 根据 ignore 配置过滤文件列表
 */
function filterFilesByIgnore(
  globResult: string[],
  ignore_configs: string[],
  ignore_rules: string[],
  cwd = process.cwd()
) {
  // 添加规则
  const rules = ignore().add([...ignore_configs, ...ignore_rules]);
  // 开始过滤
  const filtered = globResult
    .map((raw) => (path.isAbsolute(raw) ? raw : path.resolve(cwd, raw))) // 先转换成绝对路径
    .map((raw) => path.relative(cwd, raw)) // 再转换成相对路径，目的是统一变成  ['.stylelintrc.js', 'commitlint.config.js'] 这样的形式，为后面过滤做准备
    .filter((filePath) => !rules.ignores(filePath)) // 过滤
    .map((raw) => path.resolve(cwd, raw)); // 过滤后再转换成绝对路径
  return filtered;
}

/**
 * @param {Partial} config 传入的配置
 * @return {*}
 * @description: 执行扫描
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
  process.chdir(process.cwd());

  // 加载忽略的配置文件，将配置文件里面的忽略文件转变成数组
  const ignoreConfigs = loadingIgnoreConfigFile(ignore_config_file);

  // console.log('ignoreConfigs', ignoreConfigs);

  // 使用 glob 进行扫描
  const globResult = await globScan(
    root_path,
    scan_file_type,
    is_open_default_ignore
  );

  // console.log('globResult', globResult);

  // 再结合 ignoreConfigs，ignore_rules 进行过滤
  const result = filterFilesByIgnore(globResult, ignoreConfigs, ignore_rules);

  return result;
}
