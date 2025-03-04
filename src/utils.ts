import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculate(numbers: number[]): string[] {
  if (new Set(numbers).size !== 4) {
    return [];
  }

  const results = new Set<string>();
  const operators = ["+", "-", "*", "/"];
  const perms = permute(numbers);

  for (const perm of perms) {
    const [a, b, c, d] = perm;
    for (const op1 of operators) {
      for (const op2 of operators) {
        for (const op3 of operators) {
          const checkAndAdd = (result: number | null, expr: string) => {
            if (result !== null && Math.abs(result - 24) < 1e-6) {
              results.add(`${expr} = 24`);
            }
          };

          // Structure 1: ((a op1 b) op2 c) op3 d
          checkAndAdd(
            computeStructure1(a, b, c, d, op1, op2, op3),
            `((${a} ${op1} ${b}) ${op2} ${c}) ${op3} ${d}`
          );

          // Structure 2: (a op1 (b op2 c)) op3 d
          checkAndAdd(
            computeStructure2(a, b, c, d, op1, op2, op3),
            `(${a} ${op1} (${b} ${op2} ${c})) ${op3} ${d}`
          );

          // Structure 3: a op1 ((b op2 c) op3 d)
          checkAndAdd(
            computeStructure3(a, b, c, d, op1, op2, op3),
            `${a} ${op1} ((${b} ${op2} ${c}) ${op3} ${d})`
          );

          // Structure 4: a op1 (b op2 (c op3 d))
          checkAndAdd(
            computeStructure4(a, b, c, d, op1, op2, op3),
            `${a} ${op1} (${b} ${op2} (${c} ${op3} ${d}))`
          );

          // Structure 5: (a op1 b) op3 (c op2 d)
          checkAndAdd(
            computeStructure5(a, b, c, d, op1, op2, op3),
            `(${a} ${op1} ${b}) ${op3} (${c} ${op2} ${d})`
          );
        }
      }
    }
  }

  return Array.from(results);
}

function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  function backtrack(current: number[], remaining: number[]) {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }
    for (let i = 0; i < remaining.length; i++) {
      current.push(remaining[i]);
      const newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
      backtrack(current, newRemaining);
      current.pop();
    }
  }
  backtrack([], nums);
  return result;
}

function applyOp(a: number, b: number, op: string): number {
  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
  }
  throw new Error("Invalid operator");
}

function computeStructure1(
  a: number,
  b: number,
  c: number,
  d: number,
  op1: string,
  op2: string,
  op3: string
): number | null {
  try {
    const step1 = applyOp(a, b, op1);
    const step2 = applyOp(step1, c, op2);
    const step3 = applyOp(step2, d, op3);
    return step3;
  } catch (e) {
    return null;
  }
}

function computeStructure2(
  a: number,
  b: number,
  c: number,
  d: number,
  op1: string,
  op2: string,
  op3: string
): number | null {
  try {
    const step1 = applyOp(b, c, op2);
    const step2 = applyOp(a, step1, op1);
    const step3 = applyOp(step2, d, op3);
    return step3;
  } catch (e) {
    return null;
  }
}

function computeStructure3(
  a: number,
  b: number,
  c: number,
  d: number,
  op1: string,
  op2: string,
  op3: string
): number | null {
  try {
    const step1 = applyOp(b, c, op2);
    const step2 = applyOp(step1, d, op3);
    const step3 = applyOp(a, step2, op1);
    return step3;
  } catch (e) {
    return null;
  }
}

function computeStructure4(
  a: number,
  b: number,
  c: number,
  d: number,
  op1: string,
  op2: string,
  op3: string
): number | null {
  try {
    const step1 = applyOp(c, d, op3);
    const step2 = applyOp(b, step1, op2);
    const step3 = applyOp(a, step2, op1);
    return step3;
  } catch (e) {
    return null;
  }
}

function computeStructure5(
  a: number,
  b: number,
  c: number,
  d: number,
  op1: string,
  op2: string,
  op3: string
): number | null {
  try {
    const step1 = applyOp(a, b, op1);
    const step2 = applyOp(c, d, op2);
    const step3 = applyOp(step1, step2, op3);
    return step3;
  } catch (e) {
    return null;
  }
}


