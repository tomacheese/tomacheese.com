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

// Specific device types for better type safety
export interface MobileDevice {
  name: string
  notes?: string
  purchaseDate?: string
}

export interface SmartWatch {
  name: string
  price?: number
  purchaseDate?: string
  links?: DeviceLink[]
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
  // Separate properties for each device type to ensure type safety
  mobileDevices?: MobileDevice[]
  smartWatches?: SmartWatch[]
  otherDevices?: string[]
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