// Core type definitions for Dudleytown Brewing ERP

export type UserRole = 'admin' | 'production' | 'sales';

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  createdAt: Date;
  lastLoginAt: Date;
  isActive: boolean;
}

// ==================== SALES MODULE ====================

export interface Company {
  id: string;
  name: string;
  legalName?: string;
  type: 'distributor' | 'retailer' | 'consumer' | 'taproom';
  status: 'active' | 'inactive';
  customerNumber?: string;
  
  // Contact Info
  primaryContact?: string;
  email?: string;
  phone?: string;
  website?: string;
  
  // Address
  shippingAddress: Address;
  billingAddress?: Address;
  billingSameAsShipping: boolean;
  
  // Account Management
  classification?: string;
  accountPriority?: string;
  region?: string;
  salesRep?: string;
  paymentTerms?: string;
  creditLimit?: number;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  notes?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  companyId: string;
  companyName: string;
  
  // Order Details
  orderDate: Date;
  deliveryDate?: Date;
  deliveryMethod: 'pickup' | 'delivery';
  poNumber?: string;
  
  // Items
  items: SalesOrderItem[];
  
  // Totals
  subtotal: number;
  tax: number;
  taxRate: number;
  discount: number;
  total: number;
  
  // Status
  status: 'draft' | 'submitted' | 'approved' | 'fulfilled' | 'cancelled';
  approvalStatus?: 'pending' | 'approved' | 'rejected';
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  salesRep?: string;
  notes?: string;
}

export interface SalesOrderItem {
  id: string;
  itemId: string;
  itemName: string;
  productId: string;
  productName: string;
  quantity: number;
  uom: string;
  unitPrice: number;
  discount: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  companyId: string;
  companyName: string;
  salesOrderId?: string;
  
  // Invoice Details
  invoiceDate: Date;
  dueDate: Date;
  referenceNumber?: string;
  poNumber?: string;
  
  // Items
  items: InvoiceItem[];
  
  // Totals
  subtotal: number;
  tax: number;
  taxRate: number;
  discount: number;
  total: number;
  amountPaid: number;
  balance: number;
  
  // Status
  status: 'draft' | 'pending' | 'sent' | 'paid' | 'overdue' | 'void';
  
  // Payment Info
  paymentTerms?: string;
  paymentMethod?: string;
  paymentDate?: Date;
  
  // Addresses
  shippingAddress: Address;
  billingAddress: Address;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  salesRep?: string;
  noteToCustomer?: string;
  internalNotes?: string;
}

export interface InvoiceItem {
  id: string;
  itemId: string;
  itemName: string;
  description?: string;
  quantity: number;
  uom: string;
  unitPrice: number;
  discount: number;
  total: number;
}

// ==================== INVENTORY MODULE ====================

export type ItemClass = 
  | 'beer-kegged' 
  | 'beer-packaged' 
  | 'beer-serving-tanks' 
  | 'ingredients' 
  | 'packaging' 
  | 'keg-shell' 
  | 'merchandise' 
  | 'cleaning-chemicals' 
  | 'wip' 
  | 'finished-goods';

export interface InventoryItem {
  id: string;
  name: string;
  itemNumber?: string;
  upc?: string;
  
  // Classification
  itemClass: ItemClass;
  category?: string;
  packagingType?: string;
  
  // Product Association
  productId?: string;
  productName?: string;
  
  // Units
  stockUOM: string;
  weight?: number;
  weightUnit?: string;
  
  // Pricing
  standardCost: number;
  lastPurchasePrice: number;
  salePrice?: number;
  salesTax: boolean;
  
  // Inventory Levels
  onHand: number;
  reserved: number;
  available: number;
  reorderPoint: number;
  
  // Multi-Site Tracking
  locations: {
    [siteId: string]: {
      siteName: string;
      location: string;
      quantity: number;
    }
  };
  
  // Allocation Settings
  allocationEnabled: boolean;
  preOrderEnabled: boolean;
  
  // Settings
  packageHoldDays?: number;
  depositItem?: string;
  isEnabled: boolean;
  
  // Metadata
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface Supplier {
  id: string;
  name: string;
  type: 'vendor' | 'supplier';
  status: 'active' | 'inactive';
  
  // Contact Info
  email?: string;
  phone?: string;
  website?: string;
  contactPerson?: string;
  
  // Address
  address: Address;
  
  // Payment Terms
  paymentTerms?: string;
  accountNumber?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  
  // PO Details
  poDate: Date;
  expectedDeliveryDate?: Date;
  siteId: string;
  siteName: string;
  
  // Items
  items: PurchaseOrderItem[];
  
  // Charges
  otherCharges: {
    type: 'shipping' | 'fuel-surcharge' | 'pallet-charge' | 'service-charge' | 'express-processing' | 'storage';
    amount: number;
    allocationMethod: 'equal' | 'manual' | 'relative-to-cost' | 'weight';
  }[];
  
  // Totals
  subtotal: number;
  totalCharges: number;
  total: number;
  
  // Status
  status: 'draft' | 'open' | 'partial' | 'received' | 'closed';
  
  // Shipping
  shipToAddress: Address;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  comments?: string;
  attachments?: string[];
}

export interface PurchaseOrderItem {
  id: string;
  itemId: string;
  itemName: string;
  itemNumber?: string;
  quantityOrdered: number;
  quantityReceived: number;
  uom: string;
  unitCost: number;
  totalCost: number;
}

export interface Receipt {
  id: string;
  referenceNumber: string;
  poId?: string;
  poNumber?: string;
  supplierId: string;
  supplierName: string;
  
  // Receipt Details
  receivedDate: Date;
  siteId: string;
  siteName: string;
  
  // Items
  items: ReceiptItem[];
  
  // Billing
  billStatus: 'not-received' | 'received';
  billDueDate?: Date;
  amount: number;
  
  // Status
  status: 'draft' | 'posted';
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  description?: string;
  attachments?: string[];
}

export interface ReceiptItem {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  uom: string;
  unitCost: number;
  totalCost: number;
}

// ==================== PRODUCTION MODULE ====================

export interface Product {
  id: string;
  name: string;
  abbreviation?: string;
  
  // Classification
  productClass: 'beer' | 'merchandise' | 'other';
  type?: string; // Ale, Lager, etc.
  style?: string; // IPA, Stout, etc.
  
  // Beer Details
  abv?: number;
  ibu?: number;
  targetPH?: number;
  targetGravity?: number;
  targetMashTemp?: number;
  expectedYield?: number;
  
  // Production Settings
  brewhouseDuration?: number; // hours
  fermentationDays?: number;
  conditioningDays?: number;
  defaultExpireDays?: number;
  
  // Visual
  productColor?: string;
  image?: string;
  
  // Settings
  priority?: number;
  supplier?: string;
  isEnabled: boolean;
  
  // Metadata
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Recipe {
  id: string;
  name: string;
  productId: string;
  productName: string;
  batchSize: number;
  batchSizeUOM: string;
  
  // Recipe Details
  version: number;
  isActive: boolean;
  
  // Ingredients
  ingredients: RecipeIngredient[];
  
  // Process Steps
  steps: RecipeStep[];
  
  // Expected Outcomes
  expectedOG: number;
  expectedFG: number;
  expectedABV: number;
  expectedYield: number;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  notes?: string;
}

export interface RecipeIngredient {
  id: string;
  itemId: string;
  itemName: string;
  quantity: number;
  uom: string;
  stage: 'mash' | 'boil' | 'fermentation' | 'conditioning' | 'packaging';
  timing?: string;
  notes?: string;
}

export interface RecipeStep {
  id: string;
  order: number;
  stage: 'brew' | 'fermentation' | 'conditioning' | 'packaging';
  name: string;
  description: string;
  duration?: number;
  temperature?: number;
  notes?: string;
}

export interface Batch {
  id: string;
  batchNumber: string;
  productId: string;
  productName: string;
  recipeId: string;
  recipeName: string;
  
  // Production Details
  startDate: Date;
  endDate?: Date;
  batchSize: number;
  batchSizeUOM: string;
  turnCount: number;
  
  // Equipment
  brewhouseId?: string;
  fermenterId?: string;
  fermenterName?: string;
  briteId?: string;
  briteName?: string;
  servingTankId?: string;
  servingTankName?: string;
  
  // Turns
  turns: BatchTurn[];
  
  // Status
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled';
  currentStage: 'brewing' | 'fermentation' | 'conditioning' | 'packaging' | 'complete';
  
  // Yield & Cost
  totalProduced: number;
  totalLoss: number;
  yieldPercentage: number;
  estimatedCost: number;
  actualCost: number;
  
  // Location
  siteId: string;
  siteName: string;
  currentLocation?: string;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  notes?: string;
}

export interface BatchTurn {
  turnNumber: number;
  startDate: Date;
  endDate?: Date;
  
  // Measurements
  originalGravity?: number;
  finalGravity?: number;
  abv?: number;
  attenuation?: number;
  
  // Yield
  produced: number;
  loss: number;
  split: number;
  finalAmount: number;
  yieldPercentage: number;
  
  // Status
  status: 'planned' | 'in-progress' | 'complete';
  
  // Logs
  fermentationLogs: FermentationLog[];
}

export interface FermentationLog {
  id: string;
  batchId: string;
  turnNumber: number;
  date: Date;
  
  // Measurements
  temperature: number;
  gravity?: number;
  abv?: number;
  ph?: number;
  cellCount?: number;
  
  // Metadata
  loggedBy: string;
  notes?: string;
}

export interface BatchTask {
  id: string;
  batchId: string;
  batchNumber: string;
  productName: string;
  turnNumber: number;
  
  // Task Details
  name: string;
  description?: string;
  dueDate: Date;
  completedDate?: Date;
  
  // Assignment
  assignedTo?: string;
  assignedToName?: string;
  
  // Status
  status: 'upcoming' | 'needs-attention' | 'overdue' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  
  // Scheduling
  isRecurring: boolean;
  recurringInterval?: string;
  
  // Notifications
  notificationSent: boolean;
  notificationTime?: Date;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  notes?: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: 'brewhouse' | 'fermenter' | 'brite' | 'serving-tank' | 'other';
  
  // Specifications
  capacity: number;
  capacityUOM: string;
  
  // Location
  siteId: string;
  siteName: string;
  location?: string;
  
  // Status
  status: 'available' | 'in-use' | 'cleaning' | 'maintenance' | 'offline';
  currentBatchId?: string;
  
  // Settings
  isEnabled: boolean;
  
  // Metadata
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ==================== YEAST MANAGEMENT ====================

export interface YeastPitch {
  id: string;
  strain: string;
  type: 'ale' | 'lager' | 'wild' | 'other';
  generation: number;
  lineage?: string;
  
  // Status
  status: 'active' | 'harvested' | 'pitched' | 'disposed';
  
  // Tracking
  harvestDate?: Date;
  pitchDate?: Date;
  batchId?: string;
  batchNumber?: string;
  
  // Location
  location: string;
  
  // Viability
  viability?: number;
  cellCount?: number;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
}

// ==================== FORECASTING ====================

export interface ForecastPeriod {
  month: string; // YYYY-MM
  year: number;
  monthIndex: number;
}

export interface ForecastItem {
  itemId: string;
  itemName: string;
  itemClass: ItemClass;
  productId?: string;
  productName?: string;
  siteId: string;
  
  // By Month
  forecast: {
    [monthKey: string]: { // 'YYYY-MM'
      begin: number;
      add: number;
      remove: number;
      end: number;
    }
  };
}

// ==================== REPORTING ====================

export interface COGSReportRow {
  itemClass: ItemClass;
  itemName: string;
  qtySold: number;
  salesReturns: number;
  netQty: number;
  adjQty: number;
  grossSales: number;
  discounts: number;
  salesReturnsValue: number;
  netSales: number;
  cogs: number;
  grossProfit: number;
  grossProfitMargin: number;
  pctOfSales: number;
  pctOfProfit: number;
  unitNetSales: number;
  unitCOGS: number;
  unitGrossProfit: number;
  netVolume: number;
  grossProfitPerVolume: number;
  netVolumeCE: number;
  grossProfitPerCE: number;
}

// ==================== SETTINGS ====================

export interface BrewerySettings {
  id: string;
  
  // Facility Info
  name: string;
  abbreviation?: string;
  address: Address;
  ein?: string;
  licenseNumber?: string;
  phone?: string;
  logo?: string;
  
  // General Settings
  defaultDateFormat: string;
  defaultTimezone: string;
  defaultCurrency: string;
  
  // Production Settings
  includePOInForecast: boolean;
  itemReorderNotificationBy?: string;
  kegReturnLocation?: string;
  
  // QuickBooks Integration
  qboEnabled: boolean;
  qboCompanyId?: string;
  qboAccessToken?: string;
  qboRefreshToken?: string;
  qboLastSync?: Date;
  
  // Metadata
  updatedAt: Date;
  updatedBy: string;
}

// ==================== NOTIFICATIONS ====================

export interface Notification {
  id: string;
  userId: string;
  
  // Details
  type: 'task' | 'reorder' | 'batch' | 'order' | 'system';
  title: string;
  message: string;
  
  // Related Entity
  entityType?: 'task' | 'batch' | 'order' | 'item' | 'po';
  entityId?: string;
  
  // Status
  isRead: boolean;
  readAt?: Date;
  
  // Scheduling
  scheduledFor?: Date;
  sentAt?: Date;
  
  // Metadata
  createdAt: Date;
}
