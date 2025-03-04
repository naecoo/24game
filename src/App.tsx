import { useState } from "react";
import { calculate } from "./utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function App() {
  const [numbers, setNumbers] = useState<string[]>(["1", "2", "3", "8"]);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const handleInput = (index: number, value: string) => {
    setError("");

    const values = [...numbers];
    values[index] = value;
    setNumbers(values);
  };

  const handleCalculate = () => {
    setResults([]);

    const values = numbers
      .filter((_) => _.trim().length > 0)
      .map((_) => parseInt(_))
      .filter((_) => !isNaN(_) && isFinite(_) && _ >= 1 && _ <= 9);
    if (values.length !== 4) {
      setError("请输入4个0-9的数字");
      return;
    }

    // 检查是否有重复值
    if (new Set(values).size !== 4) {
      setError("数字不能重复");
      return;
    }

    const solutions = calculate(values);
    if (solutions.length === 0) {
      setError("没有找到解决方案");
      setResults([]);
    } else {
      setResults(solutions);
      setError("");
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-900 flex justify-center p-4">
      <div className="w-full max-w-md bg-zinc-800/50 backdrop-blur-xl rounded-xl border border-zinc-700/50 shadow-xl p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">24点游戏</h1>
          <p className="mt-3 text-sm text-zinc-400">
            输入4个不重复的1-9数字，计算如何得到24
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {numbers.map((num, index) => (
            <Input
              key={index}
              type="text"
              value={num}
              onInput={(e) => handleInput(index, e.currentTarget.value)}
              className="text-center text-lg bg-zinc-800 border-zinc-700 text-zinc-100 hover:border-zinc-600 focus-visible:ring-indigo-400/30 focus-visible:border-indigo-400"
            />
          ))}
        </div>

        <Button
          onClick={handleCalculate}
          className={`w-full bg-gradient-to-r transition-all duration-500 relative overflow-hidden ${results.length > 0 ? 'from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 scale-105 animate-rainbow-border' : 'from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'} text-white shadow-lg shadow-indigo-500/25 border-0 before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-500 before:via-purple-500 before:to-indigo-500 before:animate-rainbow-flow before:opacity-0 ${results.length > 0 ? 'before:opacity-30' : ''}`}
        >
          计算
        </Button>

        {error && (
          <div className="text-red-400 text-center text-sm font-medium">{error}</div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-100">
              找到 {results.length} 个解决方案：
            </h2>
            <div className="bg-zinc-800/50 rounded-lg border border-zinc-700/50 p-4 max-h-[300px] overflow-y-auto">
              <ul className="space-y-2 list-disc list-inside">
                {results.map((result, index) => (
                  <ol key={index} className="text-zinc-300">
                    {result} = 24
                  </ol>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
