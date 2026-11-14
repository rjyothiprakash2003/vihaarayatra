import { siteInfo } from '@/data/site'

export function buildWhatsAppUrl(message?: string): string {
  const text =
    message ??
    'Hello VihaaraYatra, I am interested in planning an international tour. Please share the available packages and details.'
  return `${siteInfo.whatsapp.primaryWaMe}?text=${encodeURIComponent(text)}`
}

export function destinationWhatsAppMessage(destination: string): string {
  return `Hello VihaaraYatra, I am interested in planning a trip to ${destination}. Please share available packages and details.`
}

export function packageWhatsAppMessage(packageTitle: string): string {
  return `Hello VihaaraYatra, I am interested in the ${packageTitle} package. Please share current availability, pricing and inclusions.`
}
