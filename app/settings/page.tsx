"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [projectUpdates, setProjectUpdates] = useState(true)

  const handleSaveCompany = () => {
    toast({
      title: "Company information saved",
      description: "Your business details have been updated successfully.",
    })
  }

  const handleSavePricing = () => {
    toast({
      title: "Pricing updated",
      description: "Default material pricing has been saved.",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground">Settings</h1>
          <p className="mt-2 text-muted-foreground">Manage your account and application preferences</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your business details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" defaultValue="Serrano Doors Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="contact@serrano.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Industrial Blvd, Suite 100" />
              </div>
              <Button onClick={handleSaveCompany} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing Configuration</CardTitle>
              <CardDescription>Set default pricing for materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="wood">Wood (per unit)</Label>
                  <Input id="wood" type="number" defaultValue="450" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metal">Metal (per unit)</Label>
                  <Input id="metal" type="number" defaultValue="380" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="composite">Composite (per unit)</Label>
                  <Input id="composite" type="number" defaultValue="520" />
                </div>
              </div>
              <Button onClick={handleSavePricing} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Update Pricing
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage how you receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive email updates for new estimates</div>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">Project Updates</div>
                  <div className="text-sm text-muted-foreground">Get notified when project status changes</div>
                </div>
                <Switch checked={projectUpdates} onCheckedChange={setProjectUpdates} />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
