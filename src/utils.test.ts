import { describe, expect, it } from "vitest";
import { calculate } from "./utils";

describe("calculate", () => {
  it("应该正确计算基本的24点组合", () => {
    const testCases = [
      [4, 6, 7, 1],
      [3, 3, 8, 8],
      [1, 5, 5, 5]
    ];
    testCases.forEach((numbers) => {
      const result = calculate(numbers);
      expect(result.length).toBeGreaterThan(0);
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
  });

  it("应该处理无解的情况", () => {
    const testCases = [
      [1, 1, 1, 1],
      [1, 2, 3, 4],
      [7, 7, 7, 7]
    ];
    testCases.forEach((numbers) => {
      expect(calculate(numbers)).toEqual([]);
    });
  });

  it("应该处理输入长度不为4的情况", () => {
    const testCases = [
      [],
      [1],
      [1, 2],
      [1, 2, 3],
      [1, 2, 3, 4, 5]
    ];
    testCases.forEach((numbers) => {
      expect(calculate(numbers)).toEqual([]);
    });
  });

  it("应该处理包含除法的情况", () => {
    const testCases = [
      [9, 3, 1, 8],
      [6, 6, 1, 2],
      [8, 4, 2, 1]
    ];
    testCases.forEach((numbers) => {
      const result = calculate(numbers);
      const hasDivision = result.some((solution) => solution.includes("÷"));
      expect(hasDivision).toBe(true);
    });
  });

  it("应该避免重复的计算路径", () => {
    const testCases = [
      [2, 4, 6, 8],
      [3, 3, 3, 3],
      [1, 2, 3, 4]
    ];
    testCases.forEach((numbers) => {
      const result = calculate(numbers);
      const uniqueResults = new Set(result);
      expect(uniqueResults.size).toBe(result.length);
    });
  });

  it("应该处理负数输入", () => {
    expect(calculate([-1, -2, -3, -4])).toEqual([]);
  });

  it("应该处理非整数输入", () => {
    expect(calculate([1.1, 2.2, 3.3, 4.4])).toEqual([]);
  });
});
