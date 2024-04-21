import { execSync } from 'child_process';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';

function getIncludes(code: string) {
  let includes = code.split('\n').filter((line) => line.startsWith('#include'));
  code = code.split('\n').filter((line) => !line.startsWith('#include')).join('\n');
  return { includes, code };
}

export function preprocess(code: string) {
  const id = uuid();
  const path = `${id}/code.cpp`;
  let { includes, code: newCode } = getIncludes(code);
  execSync(`mkdir ${id}`);
  fs.writeFileSync(path, newCode);
  execSync(`g++ -E ${path} -o ${id}/preprocessed.cpp`)
  const preprocessedCode = fs.readFileSync(`${id}/preprocessed.cpp`, 'utf-8');

  execSync(`rm -rf ${id}`)
  return [...includes, ...preprocessedCode.split("\n")].join('\n');
}