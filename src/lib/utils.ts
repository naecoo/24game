import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTwentyFour(numbers: number[]): string[] {
  if (numbers.length !== 4) {
    return [];
  }

  const results = new Set<string>();
  const operators = ["+", "-", "*", "/"];
  const seen = new Set<string>();

  function normalizeOperation(a: number, b: number, op: string): [number, number, string, number] {
    let result: number;
    // 对加法和乘法，保证较小的数在前面
    if ((op === "+" || op === "*") && b < a) {
      [a, b] = [b, a];
    }
    switch (op) {
      case "+":
        result = a + b;
        break;
      case "-":
        result = a - b;
        break;
      case "*":
        result = a * b;
        break;
      case "/":
        if (b === 0 || !Number.isInteger(a / b)) {
          result = NaN;
        } else {
          result = a / b;
        }
        break;
      default:
        result = NaN;
    }
    return [a, b, op, result];
  }

  function generateExpressions(
    nums: number[],
    used: boolean[],
    expr: string,
    steps: string[]
  ) {
    if (nums.length === 1) {
      if (Math.abs(nums[0] - 24) < 0.0001) {
        results.add(steps.join(", "));
      }
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      for (let j = 0; j < nums.length; j++) {
        if (i === j || used[j]) continue;
        for (const op of operators) {
          const [normalizedA, normalizedB, normalizedOp, result] = 
            normalizeOperation(nums[i], nums[j], op);
          
          if (isNaN(result)) continue;

          const key = `${normalizedA},${normalizedB},${normalizedOp},${result}`;
          if (seen.has(key)) continue;
          seen.add(key);

          const newNums = nums.filter((_, idx) => !used[idx] && idx !== i && idx !== j);
          newNums.push(result);
          const newUsed = new Array(newNums.length).fill(false);

          const stepStr = `${nums[i]} ${op} ${nums[j]} = ${result}`;
          generateExpressions(
            newNums,
            newUsed,
            expr ? `(${expr} ${op} ${nums[j]})` : `${nums[i]} ${op} ${nums[j]}`,
            [...steps, stepStr]
          );
        }
      }
    }
  }

  generateExpressions(numbers, new Array(numbers.length).fill(false), "", []);
  return Array.from(results);
}
