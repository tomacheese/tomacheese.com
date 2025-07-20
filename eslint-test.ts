// This is a test to demonstrate the new ESLint capabilities
const unused = 'this should be caught';
console.log('console should be warned about');

interface TestInterface {
  data: any; // TypeScript any should be caught
}

function testFunc(param: any) { // Another any usage
  const localUnused = 'local unused var';
  return param;
}