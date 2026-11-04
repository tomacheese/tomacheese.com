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

// デバイス種別ごとの型
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
  // デバイス種別ごとの追加プロパティ
  specs?: string[]
  warranty?: string
  totalPrice?: number | string
  purchaseInfo?: string
  extra?: Record<string, string | number>
  notes?: string
  related?: string
  links?: DeviceLink[]
  // 種別を問わず保持できる汎用の devices プロパティ
  devices?: MobileDevice[] | SmartWatch[] | string[]
  // 型安全のため種別ごとに分けたプロパティ
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
