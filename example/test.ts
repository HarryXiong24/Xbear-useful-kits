import { globScan, scan } from '../src/main';

// const test1 = globScan('', '**/*.?(js|jsx|ts|tsx|vue)', true).then(
//   (resolve) => {
//     console.log(resolve);
//   }
// );

const test2 = scan({
  ignoreFileName: '.gitignore',
}).then((res) => {
  console.log(res);
});
