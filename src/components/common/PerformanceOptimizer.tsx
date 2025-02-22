import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface CriticalResource {
  href: string
  as: string
  type?: string
}

const PerformanceOptimizer: React.FC = () => {
  const location = useLocation()

  useEffect(() => {
    // Reset scroll position on route change
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    // Preload critical resources
    const preloadResources = () => {
      // Add preload links for critical resources
      const criticalResources: CriticalResource[] = [
        // Add your critical resources here
        // Example: { href: '/fonts/your-font.woff2', as: 'font', type: 'font/woff2' }
      ]

      criticalResources.forEach(resource => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = resource.href
        link.as = resource.as
        if (resource.type) {
          link.type = resource.type
        }
        document.head.appendChild(link)
      })
    }

    preloadResources()
  }, [])

  useEffect(() => {
    // Implement lazy loading for images
    const lazyLoadImages = () => {
      const images = document.querySelectorAll('img[data-src]')
      
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            img.src = img.dataset.src || ''
            img.removeAttribute('data-src')
            observer.unobserve(img)
          }
        })
      })

      images.forEach(img => imageObserver.observe(img))
    }

    // Implement lazy loading for iframes
    const lazyLoadIframes = () => {
      const iframes = document.querySelectorAll('iframe[data-src]')
      
      const iframeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const iframe = entry.target as HTMLIFrameElement
            iframe.src = iframe.dataset.src || ''
            iframe.removeAttribute('data-src')
            observer.unobserve(iframe)
          }
        })
      })

      iframes.forEach(iframe => iframeObserver.observe(iframe))
    }

    // Initialize lazy loading
    lazyLoadImages()
    lazyLoadIframes()

    // Clean up observers on unmount
    return () => {
      const images = document.querySelectorAll('img[data-src]')
      const iframes = document.querySelectorAll('iframe[data-src]')
      const observer = new IntersectionObserver(() => {})
      
      images.forEach(img => observer.unobserve(img))
      iframes.forEach(iframe => observer.unobserve(iframe))
    }
  }, [location.pathname])

  useEffect(() => {
    // Implement route-based code splitting
    const prefetchRoutes = () => {
      // Add your route prefetching logic here
      // Example: if (someCondition) import('./SomeComponent')
    }

    prefetchRoutes()
  }, [location.pathname])

  useEffect(() => {
    // Optimize third-party resources
    const optimizeThirdParty = () => {
      // Add DNS prefetching for third-party domains
      const thirdPartyDomains: string[] = [
        // Add your third-party domains here
        // Example: 'https://api.example.com'
      ]

      thirdPartyDomains.forEach(domain => {
        const link = document.createElement('link')
        link.rel = 'dns-prefetch'
        link.href = domain
        document.head.appendChild(link)
      })
    }

    optimizeThirdParty()
  }, [])

  // The component doesn't render anything visible
  return null
}

export default PerformanceOptimizer 