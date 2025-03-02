import { describe, expect, it } from "vitest";
import { calculateTwentyFour } from "./utils";

describe("calculateTwentyFour", () => {
  it("应该正确计算基本的24点组合", () => {
    const result = calculateTwentyFour([4, 6, 7, 1]);
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
    const result = calculateTwentyFour([1, 1, 1, 1]);
    expect(result).toEqual([]);
  });

  it("应该处理输入长度不为4的情况", () => {
    expect(calculateTwentyFour([1, 2, 3])).toEqual([]);
    expect(calculateTwentyFour([1, 2, 3, 4, 5])).toEqual([]);
  });

  it("应该处理包含除法的情况", () => {
    const result = calculateTwentyFour([8, 3, 9, 3]);
    expect(result.length).toBeGreaterThan(0);
    // 验证结果中包含除法运算
    const hasDivision = result.some(solution => solution.includes("/"));
    expect(hasDivision).toBe(true);
  });

  it("应该正确处理乘法和加法的交换律", () => {
    const result = calculateTwentyFour([2, 3, 4, 5]);
    // 验证结果中较小的数字总是在前面（对于加法和乘法）
    const isValid = result.every(solution => {
      const steps = solution.split(", ");
      return steps.every(step => {
        const [expr] = step.split(" = ");
        const [a, op, b] = expr.split(" ");
        if (op === "+" || op === "*") {
          return Number(a) <= Number(b);
        }
        return true;
      });
    });
    expect(isValid).toBe(true);
  });

  it("应该避免重复的计算路径", () => {
    const result = calculateTwentyFour([2, 4, 6, 8]);
    const uniqueResults = new Set(result);
    expect(uniqueResults.size).toBe(result.length);
  });

  it("应该正确处理需要多步计算的复杂情况", () => {
    const result = calculateTwentyFour([1, 2, 3, 8]);
    expect(result.length).toBeGreaterThan(0);
    // 验证结果包含多个计算步骤
    const hasMultipleSteps = result.some(solution => {
      return solution.split(", ").length > 2;
    });
    expect(hasMultipleSteps).toBe(true);
  });
});