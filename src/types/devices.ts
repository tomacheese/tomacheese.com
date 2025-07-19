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
  extra?: Record<string, string>
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
  description: string
  sections: Record<string, DeviceSection>
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