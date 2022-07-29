import scan from '../src/main';

void scan({
  // root_path: './src',
  ignore_config_file: '.gitignore',
}).then((res) => {
  console.log(res);
});
