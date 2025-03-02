import { useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { calculateTwentyFour } from "./lib/utils";

function App() {
  const [numbers, setNumbers] = useState<string[]>(["1", "2", "3", "4"]);
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

    const solutions = calculateTwentyFour(values);
    if (solutions.length === 0) {
      setError("没有找到解决方案");
      setResults([]);
    } else {
      setResults(solutions);
      setError("");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">24点游戏</h1>
          <p className="mt-2 text-sm text-gray-600">
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
              className="text-center text-lg"
            />
          ))}
        </div>

        <Button
          onClick={handleCalculate}
          className="w-full bg-blue-500 text-black hover:bg-blue-600 ring-blue-500"
        >
          计算
        </Button>

        {error && (
          <div className="text-red-500 text-center text-sm">{error}</div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              找到 {results.length} 个解决方案：
            </h2>
            <div className="bg-gray-50 rounded-md p-4">
              <ul className="space-y-2 list-disc list-inside">
                {results.map((result, index) => (
                  <li key={index} className="text-gray-700">
                    {result} = 24
                  </li>
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
