"use client"

import { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useTheme } from 'next-themes'

export function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const pointsRef = useRef<THREE.Points | null>(null)
  const frameIdRef = useRef<number>(0)
  
  const { theme } = useTheme()
  
  useEffect(() => {
    if (!containerRef.current) return
    
    // Setup scene
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 20
    cameraRef.current = camera
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer
    
    // Create particle geometry
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1500
    
    const posArray = new Float32Array(particlesCount * 3)
    const scaleArray = new Float32Array(particlesCount)
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 50 // x
      posArray[i + 1] = (Math.random() - 0.5) * 50 // y
      posArray[i + 2] = (Math.random() - 0.5) * 50 // z
      
      // Size variation
      scaleArray[i / 3] = Math.random() * 2
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1))
    
    // Create particles material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
      color: theme === 'dark' ? 0xffffff : 0x000000,
    })
    
    // Create particle system
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particleSystem)
    pointsRef.current = particleSystem
    
    // Animation function
    const animate = () => {
      if (!pointsRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return
      
      // Rotate particles
      pointsRef.current.rotation.x += 0.0001
      pointsRef.current.rotation.y += 0.0001
      
      // Mouse movement effect will be added here
      
      // Render
      rendererRef.current.render(sceneRef.current, cameraRef.current)
      
      // Continue animation loop
      frameIdRef.current = requestAnimationFrame(animate)
    }
    
    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return
      
      // Update camera
      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      
      // Update renderer
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }
    
    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      if (!pointsRef.current) return
      
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1
      
      // Subtle movement based on mouse position
      pointsRef.current.rotation.x += mouseY * 0.0005
      pointsRef.current.rotation.y += mouseX * 0.0005
    }
    
    // Event listeners
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    
    // Start animation
    animate()
    
    // Cleanup
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current)
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
      
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [theme])
  
  // Update particle color on theme change
  useEffect(() => {
    if (!pointsRef.current) return
    
    // Cast to PointsMaterial to access color property
    const material = pointsRef.current.material as THREE.PointsMaterial
    
    // Set color based on theme
    material.color.set(theme === 'dark' ? 0xffffff : 0x000000)
    material.opacity = theme === 'dark' ? 0.5 : 0.3
    
  }, [theme])
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  )
}