import { describe, expect, it } from "vitest";
import { calculate } from "./utils";

describe("calculate", () => {
  it("应该正确计算基本的24点组合", () => {
    const result = calculate([4, 6, 7, 1]);
    expect(result.length).toBeGreaterThan(0);
    // 验证至少一个解决方案是正确的
    const solution = result[0].split(", ");
    let finalValue = 0;
    for (const step of solution) {
      const [expr] = step.split(" = ");
      if (step === solution[solution.length - 1]) {
        finalValue = eval(expr);
      }
    }
    expect(Math.abs(finalValue - 24)).toBeLessThan(0.0001);
  });

  it("应该处理无解的情况", () => {
    const result = calculate([1, 1, 1, 1]);
    expect(result).toEqual([]);
  });

  it("应该处理输入长度不为4的情况", () => {
    expect(calculate([1, 2, 3])).toEqual([]);
    expect(calculate([1, 2, 3, 4, 5])).toEqual([]);
  });

  it("应该处理包含除法的情况", () => {
    const result = calculate([9, 3, 1, 8]);
    // 验证结果中包含除法运算
    const hasDivision = result.some((solution) => solution.includes("/"));
    expect(hasDivision).toBe(true);
  });

  it("应该避免重复的计算路径", () => {
    const result = calculate([2, 4, 6, 8]);
    const uniqueResults = new Set(result);
    expect(uniqueResults.size).toBe(result.length);
  });
});
