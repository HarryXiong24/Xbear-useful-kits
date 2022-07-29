import fs from 'fs';
import scan from '../code-scan';
import { DEFAULT_PARAM } from '../code-scan/config';
import { DefaultScanParam } from '../code-scan/types';
import { FileScanResult } from './types';

/**
 * @param {string} filePath 文件路径
 * @return {*}
 * @description: 获取文件类型
 */
function getFileType(filePath: string) {
  const matches = /\.[\w]+$/.exec(filePath);
  return matches ? matches[0].replace('.', '') : '';
}

/**
 * @param {string} filePath 文件路径
 * @return {*}
 * @description: 计算单个文件的代码行数
 */
function getFileLine(filePath: string): FileScanResult | Record<string, never> {
  try {
    const fileContent = fs.readFileSync(filePath).toString();
    const codeArray = fileContent.split('\n');
    // 文件名
    const fileName = filePath.slice(
      filePath.lastIndexOf('/') + 1,
      filePath.length
    );
    // 文件类型
    const fileType = getFileType(filePath);
    // 所有行
    const allLine = codeArray.length;
    // 有代码的行数
    const codeLine = codeArray.filter((c) => c).length;
    // 空白行数
    const blankLine = allLine - codeLine;

    if (fileType && allLine) {
      return {
        fileName,
        filePath,
        fileType,
        codeLine,
        blankLine,
        allLine,
      } as FileScanResult;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
    return {};
  }
}

/**
 * 获取代码行数
 */
/**
 * @param {string} files 文件数组
 * @return {*}
 * @description: 获取所有文件的代码行数
 */
function getCodeLine(files: string[]) {
  const result: Array<FileScanResult> = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const line = getFileLine(file);
    if (line) {
      result.push(line as FileScanResult);
    }
  }
  return result;
}

/**
 * @param {Array} detail 获取的具体数据
 * @return {*}
 * @description: 汇总处理统计结果
 */
function getSummary(detail: Array<FileScanResult>) {
  const summary = [];
  const all = { name: 'All', files: 0, allLine: 0, codeLine: 0, blankLine: 0 };
  const category: Record<string, any> = {};

  // 分文件类型统计
  for (let i = 0; i < detail.length; i++) {
    const { fileType, codeLine, blankLine, allLine } = detail[i];
    const current = category[fileType];
    if (category[fileType]) {
      current.codeLine += codeLine;
      current.blankLine += blankLine;
      current.allLine += allLine;
      current.files++;
    } else {
      // 不存在则新建
      category[fileType] = {
        codeLine,
        blankLine,
        allLine,
        files: 1,
      };
    }
  }

  // 汇总统计
  const keys = Object.keys(category);
  for (let j = 0; j < keys.length; j++) {
    const key = keys[j];
    summary.push({
      name: key,
      ...category[key],
    });
    all.files += category[key].files;
    all.allLine += category[key].allLine;
    all.codeLine += category[key].codeLine;
    all.blankLine += category[key].blankLine;
  }
  summary.push(all);

  return summary.sort((a, b) => b.allLine - a.allLine);
}

/**
 * @param {Partial} config 扫描配置
 * @return {*}
 * @description: 启动函数
 */
export async function scanLine(config: Partial<DefaultScanParam>) {
  const scanParam: DefaultScanParam = Object.assign(DEFAULT_PARAM, config);
  const files = await scan(scanParam);
  const detail = getCodeLine(files);
  const summary = getSummary(detail);

  return {
    summary,
    detail,
  };
}

export default scanLine;
