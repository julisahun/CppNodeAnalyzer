import { analyze } from "../tests";

describe('should format include statements', () => {
  it('should mode include statements to the top of the file', () => {
    const result = analyze('formatter/includes/top.cpp');
    expect(result.formattedCode).toEqual(`#include <iostream>\n#include <string>\n#include <vector>\nif(true){std::cout<<"true"<<std::endl;}else{std::cout<<"false"<<std::endl;}`);
  });

  it('should remove duplicate include statements', () => {
    const result = analyze('formatter/includes/duplicates.cpp');
    expect(result.formattedCode).toEqual(`#include <iostream>\n#include <vector>\n`)
  });

  it('should sort include statements alphabetically', () => {
    const result = analyze('formatter/includes/sort.cpp');
    expect(result.formattedCode).toEqual(`#include <algorithm>\n#include <iostream>\n#include <string>\n#include <vector>\n`)
  });
});