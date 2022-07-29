import scan from '../src/main';

void scan({
  ignore_config_file: '.gitignore',
}).then((res) => {
  console.log(res);
});
