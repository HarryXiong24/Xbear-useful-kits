import { scanFile, scanLine } from '../src/main';

void scanFile({
  // root_path: './src',
  ignore_config_file: '.gitignore',
}).then((res) => {
  console.log(res);
});

void scanLine({
  // root_path: './src',
  ignore_config_file: '.gitignore',
}).then((res) => {
  console.log(res);
});
