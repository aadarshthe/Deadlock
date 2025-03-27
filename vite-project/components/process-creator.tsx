"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash } from "lucide-react"

type Process = {
  id: string
  name: string
  priority: number
  resources: string[]
}

export default function ProcessCreator() {
  const [processes, setProcesses] = useState<Process[]>([
    { id: "P1", name: "Process 1", priority: 1, resources: ["R2"] },
    { id: "P2", name: "Process 2", priority: 2, resources: ["R3"] },
    { id: "P3", name: "Process 3", priority: 1, resources: ["R1"] },
  ])

  const [newProcess, setNewProcess] = useState<Process>({
    id: `P${processes.length + 1}`,
    name: `Process ${processes.length + 1}`,
    priority: 1,
    resources: [],
  })

  const addProcess = () => {
    setProcesses([...processes, newProcess])
    setNewProcess({
      id: `P${processes.length + 2}`,
      name: `Process ${processes.length + 2}`,
      priority: 1,
      resources: [],
    })
  }

  const removeProcess = (id: string) => {
    setProcesses(processes.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="process-id" className="text-xs text-green-400">
              Process ID
            </Label>
            <Input
              id="process-id"
              value={newProcess.id}
              onChange={(e) => setNewProcess({ ...newProcess, id: e.target.value })}
              className="bg-black border-green-500/30 text-green-400 h-8"
            />
          </div>
          <div>
            <Label htmlFor="process-name" className="text-xs text-green-400">
              Name
            </Label>
            <Input
              id="process-name"
              value={newProcess.name}
              onChange={(e) => setNewProcess({ ...newProcess, name: e.target.value })}
              className="bg-black border-green-500/30 text-green-400 h-8"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="process-priority" className="text-xs text-green-400">
            Priority
          </Label>
          <Input
            id="process-priority"
            type="number"
            min="1"
            max="10"
            value={newProcess.priority}
            onChange={(e) => setNewProcess({ ...newProcess, priority: Number.parseInt(e.target.value) })}
            className="bg-black border-green-500/30 text-green-400 h-8"
          />
        </div>

        <Button
          onClick={addProcess}
          className="w-full bg-green-900/20 hover:bg-green-900/40 text-green-500 border border-green-500/50 h-8"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Process
        </Button>
      </div>

      <div className="border border-green-500/20 rounded-md p-2 max-h-[200px] overflow-y-auto">
        <h3 className="text-sm font-mono mb-2 text-green-400">Active Processes</h3>

        {processes.length === 0 ? (
          <div className="text-xs text-gray-500 italic">No processes created</div>
        ) : (
          <div className="space-y-2">
            {processes.map((process) => (
              <div
                key={process.id}
                className="flex items-center justify-between bg-green-900/10 p-2 rounded-md border border-green-500/20"
              >
                <div>
                  <div className="text-sm font-bold text-green-400">{process.id}</div>
                  <div className="text-xs text-gray-400">{process.name}</div>
                  <div className="text-xs text-gray-500">Priority: {process.priority}</div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  onClick={() => removeProcess(process.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

