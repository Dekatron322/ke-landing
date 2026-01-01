// Customer lookup interfaces
export interface CustomerLookupRequest {
  reference: string
  type: string
}

export interface Tariff {
  id: number
  tariffIndex: string
  tariffCode: string
  name: string
  serviceBand: number
  tariffType: string
  tariffClass: string
  tariffRate: number
  currency: string
  unitOfMeasure: string
  fixedCharge: number
  minimumCharge: number
  description: string
  isActive: boolean
  isLocked: boolean
  effectiveFromUtc: string
  effectiveToUtc: string
  publishedAtUtc: string
  publishedBy: string
  version: string
  supersedesTariffGroupId: number
  sourceDocumentRef: string
}

export interface Category {
  id: number
  name: string
  description: string
  subCategories: Array<{
    id: number
    name: string
    description: string
    customerCategoryId: number
  }>
}

export interface SubCategory {
  id: number
  name: string
  description: string
  customerCategoryId: number
}

export interface SalesRepUser {
  id: number
  fullName: string
  email: string
  phoneNumber: string
}

export interface CustomerLookupData {
  id: number
  customerNumber: number
  accountNumber: string
  autoNumber: string
  isCustomerNew: boolean
  isPostEnumerated: boolean
  statusCode: string
  isReadyforExtraction: boolean
  fullName: string
  phoneNumber: string
  employeeNo: string
  salesRepPhone: string
  phoneOffice: string
  gender: string
  email: string
  status: string
  isSuspended: boolean
  distributionSubstationId: number
  feederId: number
  distributionSubstationCode: string
  feederName: string
  areaOfficeName: string
  companyName: string
  address: string
  addressTwo: string
  mapName: string
  type: string
  city: string
  provinceId: number
  provinceName: string
  lga: string
  serviceCenterId: number
  serviceCenterName: string
  latitude: number
  longitude: number
  tariffRate: number
  tariffId: number
  tariff: Tariff
  isPPM: boolean
  isMeteredPostpaid: boolean
  isMD: boolean
  isUrban: boolean
  isHRB: boolean
  isCustomerAccGovt: boolean
  comment: string
  storedAverage: number
  totalMonthlyVend: number
  totalMonthlyDebt: number
  totalLifetimeDebit: number
  totalLifetimeCredit: number
  customerOutstandingDebtBalance: number
  customerOutstandingCreditBalance: number
  customerOutstandingBalance: number
  customerOutstandingBalanceLabel: string
  salesRepUserId: number
  technicalEngineerUserId: number
  category: Category
  subCategory: SubCategory
  salesRepUser: SalesRepUser
  lastLoginAt: string
  suspensionReason: string
  suspendedAt: string
  technicalEngineerUser: SalesRepUser
  serviceCenter: {
    id: number
    name: string
    code: string
    address: string
    areaOfficeId: number
    latitude: number
    longitude: number
  }
  meters: Array<{
    id: number
    customerId: number
    customerAccountNumber: string
    customerFullName: string
    serialNumber: string
    drn: string
    sgc: number
    krn: string
    ti: number
    ea: number
    tct: number
    ken: number
    mfrCode: number
    installationDate: string
    meterAddedBy: string
    meterEditedBy: string
    meterDateCreated: string
    meterType: number
    isSmart: boolean
    meterBrand: string
    meterCategory: string
    isMeterActive: boolean
    status: number
    meterState: number
    sealNumber: string
    poleNumber: string
    tariffRate: number
    tariffId: number
    tariff: Tariff
    injectionSubstationId: number
    distributionSubstationId: number
    feederId: number
    areaOfficeId: number
    state: number
    address: string
    addressTwo: string
    city: string
    apartmentNumber: string
    latitude: number
    longitude: number
    tenantFullName: string
    tenantPhoneNumber: string
  }>
}

export interface CustomerLookupResponse {
  isSuccess: boolean
  message: string
  data: CustomerLookupData
}
