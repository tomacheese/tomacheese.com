export interface DeviceLink {
  name: string
  url: string
}

export interface DeviceItem {
  name: string
  status: string
  price?: number
  purchaseDate?: string
  notes?: string
  unused?: boolean
  links?: DeviceLink[]
  extra?: Record<string, string | number>
}

export interface DeviceCategory {
  title: string
  items: DeviceItem[]
}

export interface DeviceSection {
  title: string
  description?: string
  items?: string[]
  categories?: Record<string, DeviceCategory>
}

export interface Device {
  title: string
  description?: string
  sections?: Record<string, DeviceSection>
  // Additional properties for different device types
  specs?: string[]
  warranty?: string
  totalPrice?: number | string
  purchaseInfo?: string
  extra?: Record<string, string | number>
  notes?: string
  related?: string
  links?: DeviceLink[]
  devices?: unknown[] // For mobile devices, smart watches, etc.
}

export interface HistoryItem {
  date: string
  description: string
}

export interface Overview {
  title: string
  history: HistoryItem[]
}

export interface DevicesData {
  title: string
  overview: Overview
  devices: Record<string, Device>
}