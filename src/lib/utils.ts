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

  function generateExpressions(nums: number[], ops: string[], expr: string) {
    if (nums.length === 1) {
      if (Math.abs(nums[0] - 24) < 0.0001) {
        results.add(expr);
      }
      return;
    }

    for (let i = 0; i < nums.length - 1; i++) {
      for (const op of operators) {
        const a = nums[i];
        const b = nums[i + 1];
        let result;
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
            if (b === 0) continue;
            result = a / b;
            break;
        }

        const newNums = [...nums.slice(0, i), result!, ...nums.slice(i + 2)];
        const newOps = [...ops.slice(0, i), ...ops.slice(i + 1)];
        const newExpr = expr ? `(${expr} ${op} ${b})` : `${a} ${op} ${b}`;
        generateExpressions(newNums, newOps, newExpr);
      }
    }
  }
  generateExpressions(numbers, [], "");

  return Array.from(results);
}
