import Header from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DeadlockSimulator from "@/components/deadlock-simulator"
import ProcessCreator from "@/components/process-creator"
import ResourceManager from "@/components/resource-manager"
import AnalysisPanel from "@/components/analysis-panel"
import ThreadAnimation from "@/components/thread-animation"

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-black text-green-500 flex flex-col relative overflow-hidden">
      <Header />

      {/* Background thread animations */}
      <ThreadAnimation density={0.5} />

      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col relative z-10">
        <h1 className="text-3xl font-bold mb-6">
          <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Interactive Deadlock Playground
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          <div className="lg:col-span-2 flex flex-col">
            <div className="border border-green-500/30 rounded-lg p-4 bg-black/80 backdrop-blur-sm flex-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
              <h2 className="text-xl font-mono mb-4 flex items-center">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                System Visualization
              </h2>
              <DeadlockSimulator />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="border border-green-500/30 rounded-lg p-4 bg-black/80 backdrop-blur-sm">
              <h2 className="text-xl font-mono mb-4 flex items-center">
                <span className="inline-block w-3 h-3 bg-cyan-500 rounded-full mr-2 animate-pulse"></span>
                System Configuration
              </h2>

              <Tabs defaultValue="processes" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-black border border-green-500/30">
                  <TabsTrigger value="processes" className="data-[state=active]:bg-green-900/20">
                    Processes
                  </TabsTrigger>
                  <TabsTrigger value="resources" className="data-[state=active]:bg-green-900/20">
                    Resources
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="processes" className="mt-4">
                  <ProcessCreator />
                </TabsContent>
                <TabsContent value="resources" className="mt-4">
                  <ResourceManager />
                </TabsContent>
              </Tabs>
            </div>

            <div className="border border-green-500/30 rounded-lg p-4 bg-black/80 backdrop-blur-sm flex-1">
              <h2 className="text-xl font-mono mb-4 flex items-center">
                <span className="inline-block w-3 h-3 bg-magenta-500 rounded-full mr-2 animate-pulse"></span>
                Analysis & Solutions
              </h2>
              <AnalysisPanel />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

