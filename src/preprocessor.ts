import fs from 'fs';
import { execSync } from 'child_process';
import { v4 as uuid } from 'uuid';

function getIncludes(code: string) {
  let includes = code.split('\n').filter((line) => line.startsWith('#include'));
  code = code.split('\n').filter((line) => !line.startsWith('#include')).join('\n');
  return { includes, code };
}

export function preprocess(code: string) {
  const id = uuid();
  const path = `${id}`;
  let { includes, code: newCode } = getIncludes(code);
  try {
    execSync(`mkdir ${path}`);
    fs.writeFileSync(`${path}/code.cpp`, newCode);
    execSync(`g++ -E ${path}/code.cpp -o ${path}/preprocessed.cpp`, { stdio: 'pipe' })
    const preprocessedCode = fs.readFileSync(`${path}/preprocessed.cpp`, 'utf-8');
    return [...includes, ...preprocessedCode.split("\n")].join('\n');
  } catch (e) {
    throw new Error(e.stderr);
  } finally {
    execSync(`rm -rf ${path}`)
  }
}