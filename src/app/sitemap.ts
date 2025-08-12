import { MetadataRoute } from 'next'
import { LocationData } from '@/lib/types'
import citiesData from '../../data/cities.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://goathooftrimming.com' // Production URL
  const cities = citiesData as LocationData[]

  // Core pages
  const corePages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/thank-you`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Generate location pages
  const locationPages = cities.map((city) => {
    // Higher priority for major cities (population > 500k)
    const priority = city.population > 500000 ? 0.9 : 
                    city.population > 200000 ? 0.8 : 0.7

    return {
      url: `${baseUrl}/location/goat-hoof-trimming-${city.slug}-${city.stateSlug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority,
    }
  })

  return [...corePages, ...locationPages]
}