"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle2, Terminal } from "lucide-react"

export default function AnalysisPanel() {
  const [analysisResults, setAnalysisResults] = useState({
    deadlockDetected: true,
    cycle: ["P1", "R1", "P3", "R3", "P2", "R2", "P1"],
    waitingTime: {
      P1: 120,
      P2: 85,
      P3: 150,
    },
    resourceUtilization: 0.65,
    suggestedActions: [
      "Terminate process P3 to break the deadlock",
      "Implement resource preemption for R1",
      "Increase timeout for resource requests",
    ],
  })

  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    "> Initializing deadlock detection algorithm...",
    "> Analyzing resource allocation graph...",
    "> Building wait-for graph...",
    "> Checking for cycles in wait-for graph...",
    "> ALERT: Cycle detected in wait-for graph!",
    "> Cycle: P1 → R1 → P3 → R3 → P2 → R2 → P1",
    "> Calculating process statistics...",
    "> Generating resolution strategies...",
    "> Analysis complete. Deadlock detected.",
  ])

  const runAnalysis = () => {
    setConsoleOutput([
      ...consoleOutput,
      "> Re-running deadlock detection algorithm...",
      "> Analyzing current system state...",
    ])

    // Simulate analysis
    setTimeout(() => {
      setConsoleOutput((prev) => [...prev, "> Analysis complete. Deadlock detected."])
    }, 1500)
  }

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="console" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 bg-black border border-green-500/30">
          <TabsTrigger value="console" className="data-[state=active]:bg-green-900/20">
            Console
          </TabsTrigger>
          <TabsTrigger value="results" className="data-[state=active]:bg-green-900/20">
            Results
          </TabsTrigger>
          <TabsTrigger value="solutions" className="data-[state=active]:bg-green-900/20">
            Solutions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="console" className="flex-1 flex flex-col">
          <div className="flex-1 font-mono text-sm border border-green-500/20 rounded-md bg-black p-2 overflow-y-auto h-[300px]">
            <div className="space-y-1">
              {consoleOutput.map((line, index) => (
                <div
                  key={index}
                  className={
                    line.includes("ALERT")
                      ? "text-red-400"
                      : line.includes("Cycle:")
                        ? "text-yellow-400"
                        : line.includes("complete")
                          ? "text-green-400"
                          : "text-green-500"
                  }
                >
                  {line}
                </div>
              ))}
              <div className="h-4 w-full animate-pulse">
                <span className="inline-block w-2 h-4 bg-green-500 animate-blink"></span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <Button
              onClick={runAnalysis}
              className="bg-green-900/20 hover:bg-green-900/40 text-green-500 border border-green-500/50"
            >
              <Terminal className="h-4 w-4 mr-2" /> Run Analysis
            </Button>

            <Button
              variant="outline"
              className="border-green-500/50 hover:bg-green-900/20"
              onClick={() => setConsoleOutput([])}
            >
              Clear Console
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="results" className="flex-1">
          <div className="border border-green-500/20 rounded-md bg-black p-4 h-[300px] overflow-y-auto">
            <div className="flex items-center mb-4">
              <div className="mr-2">
                {analysisResults.deadlockDetected ? (
                  <AlertCircle className="h-5 w-5 text-red-400" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                )}
              </div>
              <h3 className="text-lg font-bold">
                {analysisResults.deadlockDetected ? (
                  <span className="text-red-400">Deadlock Detected</span>
                ) : (
                  <span className="text-green-400">No Deadlock</span>
                )}
              </h3>
            </div>

            {analysisResults.deadlockDetected && (
              <div className="mb-4">
                <h4 className="text-sm font-bold text-white mb-1">Deadlock Cycle:</h4>
                <div className="bg-red-900/20 border border-red-500/30 rounded-md p-2 font-mono text-sm">
                  {analysisResults.cycle.join(" → ")}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Process Wait Times:</h4>
                <div className="space-y-2">
                  {Object.entries(analysisResults.waitingTime).map(([process, time]) => (
                    <div key={process} className="flex justify-between items-center">
                      <span className="text-sm">{process}:</span>
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-cyan-500 h-2 rounded-full"
                          style={{ width: `${Math.min(100, time / 2)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">{time}ms</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-1">Resource Utilization:</h4>
                <div className="flex flex-col items-center">
                  <div className="relative w-20 h-20">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#374151" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#0891b2"
                        strokeWidth="10"
                        strokeDasharray={`${analysisResults.resourceUtilization * 283} 283`}
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                      {Math.round(analysisResults.resourceUtilization * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="solutions" className="flex-1">
          <div className="border border-green-500/20 rounded-md bg-black p-4 h-[300px] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">Recommended Actions</h3>

            <div className="space-y-4">
              {analysisResults.suggestedActions.map((action, index) => (
                <div
                  key={index}
                  className="border border-green-500/30 rounded-md p-3 bg-green-900/10 hover:bg-green-900/20 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="bg-green-500 text-black rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-white">{action}</p>
                      <Button variant="link" className="text-green-400 p-0 h-auto text-sm">
                        Apply this solution
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-bold text-white mb-2">Prevention Strategies:</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                  Implement resource hierarchy to prevent circular wait
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                  Use timeouts for resource acquisition
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                  Implement deadlock detection and recovery mechanisms
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

