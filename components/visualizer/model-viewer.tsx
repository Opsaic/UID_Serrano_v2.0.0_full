"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react"

export function ModelViewer({ model }: { model?: any }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const controlsRef = useRef<any>(null)

  useEffect(() => {
    let scene: any, camera: any, renderer: any, controls: any, doorModel: any
    let animationId: number

    async function init3DViewer() {
      try {
        const THREE = await import("three")
        const { OrbitControls } = await import("three/addons/controls/OrbitControls.js")

        if (!containerRef.current) return

        // Setup scene
        scene = new THREE.Scene()
        scene.background = new THREE.Color(0xf8f9fa)

        // Setup camera
        camera = new THREE.PerspectiveCamera(
          50,
          containerRef.current.clientWidth / containerRef.current.clientHeight,
          0.1,
          1000,
        )
        camera.position.set(3, 2, 4)

        // Setup renderer
        renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        containerRef.current.appendChild(renderer.domElement)

        // Setup controls
        controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.minDistance = 2
        controls.maxDistance = 10
        controls.maxPolarAngle = Math.PI / 2
        controlsRef.current = controls

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
        directionalLight.position.set(5, 10, 5)
        directionalLight.castShadow = true
        directionalLight.shadow.mapSize.width = 2048
        directionalLight.shadow.mapSize.height = 2048
        scene.add(directionalLight)

        const fillLight = new THREE.DirectionalLight(0xffffff, 0.3)
        fillLight.position.set(-5, 5, -5)
        scene.add(fillLight)

        // Add ground plane
        const groundGeometry = new THREE.PlaneGeometry(20, 20)
        const groundMaterial = new THREE.MeshStandardMaterial({
          color: 0xe8e8e8,
          roughness: 0.8,
          metalness: 0.2,
        })
        const ground = new THREE.Mesh(groundGeometry, groundMaterial)
        ground.rotation.x = -Math.PI / 2
        ground.receiveShadow = true
        scene.add(ground)

        doorModel = createDoorModel(THREE, model)
        scene.add(doorModel)
        // </CHANGE>

        setLoading(false)

        // Animation loop
        function animate() {
          animationId = requestAnimationFrame(animate)
          controls.update()
          renderer.render(scene, camera)
        }
        animate()

        // Handle window resize
        function handleResize() {
          if (!containerRef.current) return
          camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
          camera.updateProjectionMatrix()
          renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
        }
        window.addEventListener("resize", handleResize)

        return () => {
          window.removeEventListener("resize", handleResize)
          if (animationId) cancelAnimationFrame(animationId)
          if (renderer) {
            renderer.dispose()
            if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
              containerRef.current.removeChild(renderer.domElement)
            }
          }
          if (scene) {
            scene.traverse((object: any) => {
              if (object.geometry) object.geometry.dispose()
              if (object.material) {
                if (Array.isArray(object.material)) {
                  object.material.forEach((material: any) => material.dispose())
                } else {
                  object.material.dispose()
                }
              }
            })
          }
        }
      } catch (err) {
        console.error("[v0] Error initializing 3D viewer:", err)
        setError("Failed to initialize 3D viewer")
        setLoading(false)
      }
    }

    const cleanup = init3DViewer()
    return () => {
      cleanup?.then((fn) => fn?.())
    }
  }, [model])

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

  const handleZoomIn = () => {
    if (controlsRef.current) {
      const distance = controlsRef.current.getDistance()
      controlsRef.current.dollyIn(1.2)
      controlsRef.current.update()
    }
  }

  const handleZoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(1.2)
      controlsRef.current.update()
    }
  }

  return (
    <Card>
      <CardContent className="p-0 relative">
        <div ref={containerRef} className="aspect-video w-full rounded-lg overflow-hidden bg-muted/20" />

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Loading 3D viewer...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center text-destructive">
              <p className="font-medium">{error}</p>
              <p className="text-xs mt-1">Please try refreshing the page</p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button size="icon" variant="secondary" onClick={handleZoomIn} title="Zoom in">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" onClick={handleZoomOut} title="Zoom out">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" onClick={handleReset} title="Reset view">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        )}

        {!loading && !error && (
          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg text-sm">
            <p className="font-medium">{model?.name || "Custom Door Design"}</p>
            <p className="text-xs text-muted-foreground">
              {model?.type || "Standard"} • {model?.material || "Wood"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function createDoorModel(THREE: any, modelConfig?: any) {
  const doorGroup = new THREE.Group()

  // Door dimensions
  const doorWidth = 0.9
  const doorHeight = 2.1
  const doorThickness = 0.05
  const frameWidth = 0.1

  // Materials
  const doorColor = modelConfig?.color || 0x8b4513
  const doorMaterial = new THREE.MeshStandardMaterial({
    color: doorColor,
    roughness: 0.7,
    metalness: 0.1,
  })

  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.6,
    metalness: 0.1,
  })

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x88ccff,
    transparent: true,
    opacity: 0.3,
    roughness: 0.1,
    metalness: 0.1,
    transmission: 0.9,
  })

  const handleMaterial = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    roughness: 0.3,
    metalness: 0.8,
  })

  // Main door panel
  const doorGeometry = new THREE.BoxGeometry(doorWidth, doorHeight, doorThickness)
  const door = new THREE.Mesh(doorGeometry, doorMaterial)
  door.position.y = doorHeight / 2
  door.castShadow = true
  door.receiveShadow = true
  doorGroup.add(door)

  // Door panels (decorative)
  const panelWidth = doorWidth * 0.4
  const panelHeight = doorHeight * 0.35
  const panelDepth = 0.02
  const panelGeometry = new THREE.BoxGeometry(panelWidth, panelHeight, panelDepth)

  for (let row = 0; row < 2; row++) {
    const panel = new THREE.Mesh(panelGeometry, doorMaterial)
    panel.position.set(0, doorHeight * 0.3 + row * doorHeight * 0.4, doorThickness / 2 + panelDepth / 2)
    panel.castShadow = true
    doorGroup.add(panel)
  }

  // Glass window (if specified)
  if (modelConfig?.hasGlass !== false) {
    const glassGeometry = new THREE.BoxGeometry(doorWidth * 0.6, doorHeight * 0.25, doorThickness * 0.5)
    const glass = new THREE.Mesh(glassGeometry, glassMaterial)
    glass.position.set(0, doorHeight * 0.75, 0)
    doorGroup.add(glass)
  }

  // Door handle
  const handleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.15, 16)
  const handle = new THREE.Mesh(handleGeometry, handleMaterial)
  handle.rotation.z = Math.PI / 2
  handle.position.set(doorWidth * 0.35, doorHeight * 0.5, doorThickness / 2 + 0.05)
  handle.castShadow = true
  doorGroup.add(handle)

  // Door frame - sides
  const sideFrameGeometry = new THREE.BoxGeometry(frameWidth, doorHeight + frameWidth, frameWidth)

  const leftFrame = new THREE.Mesh(sideFrameGeometry, frameMaterial)
  leftFrame.position.set(-doorWidth / 2 - frameWidth / 2, doorHeight / 2 + frameWidth / 2, 0)
  leftFrame.castShadow = true
  doorGroup.add(leftFrame)

  const rightFrame = new THREE.Mesh(sideFrameGeometry, frameMaterial)
  rightFrame.position.set(doorWidth / 2 + frameWidth / 2, doorHeight / 2 + frameWidth / 2, 0)
  rightFrame.castShadow = true
  doorGroup.add(rightFrame)

  // Door frame - top
  const topFrameGeometry = new THREE.BoxGeometry(doorWidth + frameWidth * 2, frameWidth, frameWidth)
  const topFrame = new THREE.Mesh(topFrameGeometry, frameMaterial)
  topFrame.position.set(0, doorHeight + frameWidth / 2, 0)
  topFrame.castShadow = true
  doorGroup.add(topFrame)

  return doorGroup
}
// </CHANGE>
