"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Resource = {
  id: string
  name: string
  type: "sharable" | "exclusive"
  instances: number
  allocatedTo: string[]
}

export default function ResourceManager() {
  const [resources, setResources] = useState<Resource[]>([
    { id: "R1", name: "Resource 1", type: "exclusive", instances: 1, allocatedTo: ["P3"] },
    { id: "R2", name: "Resource 2", type: "exclusive", instances: 1, allocatedTo: ["P1"] },
    { id: "R3", name: "Resource 3", type: "exclusive", instances: 1, allocatedTo: ["P2"] },
  ])

  const [newResource, setNewResource] = useState<Resource>({
    id: `R${resources.length + 1}`,
    name: `Resource ${resources.length + 1}`,
    type: "exclusive",
    instances: 1,
    allocatedTo: [],
  })

  const addResource = () => {
    setResources([...resources, newResource])
    setNewResource({
      id: `R${resources.length + 2}`,
      name: `Resource ${resources.length + 2}`,
      type: "exclusive",
      instances: 1,
      allocatedTo: [],
    })
  }

  const removeResource = (id: string) => {
    setResources(resources.filter((r) => r.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="resource-id" className="text-xs text-green-400">
              Resource ID
            </Label>
            <Input
              id="resource-id"
              value={newResource.id}
              onChange={(e) => setNewResource({ ...newResource, id: e.target.value })}
              className="bg-black border-green-500/30 text-green-400 h-8"
            />
          </div>
          <div>
            <Label htmlFor="resource-name" className="text-xs text-green-400">
              Name
            </Label>
            <Input
              id="resource-name"
              value={newResource.name}
              onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
              className="bg-black border-green-500/30 text-green-400 h-8"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="resource-type" className="text-xs text-green-400">
              Type
            </Label>
            <Select
              value={newResource.type}
              onValueChange={(value: "sharable" | "exclusive") => setNewResource({ ...newResource, type: value })}
            >
              <SelectTrigger className="bg-black border-green-500/30 text-green-400 h-8">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-black border-green-500/30">
                <SelectItem value="exclusive">Exclusive</SelectItem>
                <SelectItem value="sharable">Sharable</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="resource-instances" className="text-xs text-green-400">
              Instances
            </Label>
            <Input
              id="resource-instances"
              type="number"
              min="1"
              value={newResource.instances}
              onChange={(e) => setNewResource({ ...newResource, instances: Number.parseInt(e.target.value) })}
              className="bg-black border-green-500/30 text-green-400 h-8"
            />
          </div>
        </div>

        <Button
          onClick={addResource}
          className="w-full bg-green-900/20 hover:bg-green-900/40 text-green-500 border border-green-500/50 h-8"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Resource
        </Button>
      </div>

      <div className="border border-green-500/20 rounded-md p-2 max-h-[200px] overflow-y-auto">
        <h3 className="text-sm font-mono mb-2 text-green-400">Available Resources</h3>

        {resources.length === 0 ? (
          <div className="text-xs text-gray-500 italic">No resources created</div>
        ) : (
          <div className="space-y-2">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between bg-yellow-900/10 p-2 rounded-md border border-yellow-500/20"
              >
                <div>
                  <div className="text-sm font-bold text-yellow-400">{resource.id}</div>
                  <div className="text-xs text-gray-400">{resource.name}</div>
                  <div className="text-xs text-gray-500">
                    {resource.type === "exclusive" ? "Exclusive" : "Sharable"} •{resource.instances} instance(s)
                  </div>
                  {resource.allocatedTo.length > 0 && (
                    <div className="text-xs text-gray-500">Allocated to: {resource.allocatedTo.join(", ")}</div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  onClick={() => removeResource(resource.id)}
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

