import path from 'path';
import fs from 'fs';
import glob from 'glob';
import ignore from 'ignore';
import {
  DEFAULT_IGNORE,
  DEFAULT_PARAM,
  FILE_TYPE,
  IGNORE_FILE_NAME,
} from './config';

/**
 * @param {string} rootPath 根目录
 * @param {string} fileType 文件类型
 * @param {boolean} isDefaultIgnore 是否开启默认忽略
 * @return {*}
 * @description: 获取使用 glob 扫描的文件列表
 */
export function globScan(
  rootPath: string,
  fileType: string,
  isDefaultIgnore: boolean
): Promise<string[]> {
  console.log(`${rootPath}${fileType}`);
  return new Promise((resolve) => {
    glob(
      `${rootPath}${fileType}`,
      { dot: true, ignore: isDefaultIgnore ? DEFAULT_IGNORE : [] },
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
function loadIgnorePatterns(ignoreFileName: string) {
  // __dirname 获得当前执行文件所在目录的完整目录名
  // __filename 获得当前执行文件的带有完整绝对路径的文件名
  // process.cwd() 获得当前执行 node 命令时候的文件夹目录名
  const ignorePath = path.resolve(process.cwd(), ignoreFileName);
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
  ignorePatterns: string[],
  ignoreRules: string[],
  cwd = process.cwd()
) {
  const ig = ignore().add([...ignorePatterns, ...ignoreRules]);
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
export async function scan(config: Partial<typeof DEFAULT_PARAM>) {
  const param = Object.assign(DEFAULT_PARAM, config);

  const { rootPath, file_type, isDefaultIgnore, ignoreRules, ignoreFileName } =
    param;

  // process.chdir() 改变工作目录
  process.chdir(rootPath);

  const ignorePatterns = loadIgnorePatterns(ignoreFileName);

  const files = await globScan(rootPath, file_type, isDefaultIgnore);

  return filterFilesByIgnore(files, ignorePatterns, ignoreRules);
}
