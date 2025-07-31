// ===== CUSTOMER INFORMATION MANAGEMENT =====
// 🔐 Secure local storage for customer checkout information
// 💾 Helps returning customers checkout faster

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  occupation: string;
}

export class CustomerInfoManager {
  private static readonly STORAGE_KEY = 'alpico_customer_info';
  private static readonly VERSION_KEY = 'alpico_customer_info_version';
  private static readonly CURRENT_VERSION = '1.0';

  /**
   * Save customer information to localStorage
   */
  static save(customerInfo: CustomerInfo): boolean {
    try {
      // Only save non-sensitive information
      const safeInfo = {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: customerInfo.address,
        city: customerInfo.city,
        state: customerInfo.state,
        occupation: customerInfo.occupation,
        savedAt: new Date().toISOString()
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(safeInfo));
      localStorage.setItem(this.VERSION_KEY, this.CURRENT_VERSION);
      
      console.log('Customer information saved successfully');
      return true;
    } catch (error) {
      console.error('Error saving customer info:', error);
      return false;
    }
  }

  /**
   * Load customer information from localStorage
   */
  static load(): CustomerInfo | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      const version = localStorage.getItem(this.VERSION_KEY);

      if (!stored || version !== this.CURRENT_VERSION) {
        // Clear old or incompatible data
        this.clear();
        return null;
      }

      const parsed = JSON.parse(stored);
      
      // Return only the customer info fields (exclude metadata)
      return {
        firstName: parsed.firstName || '',
        lastName: parsed.lastName || '',
        email: parsed.email || '',
        phone: parsed.phone || '',
        address: parsed.address || '',
        city: parsed.city || '',
        state: parsed.state || '',
        occupation: parsed.occupation || ''
      };
    } catch (error) {
      console.error('Error loading customer info:', error);
      this.clear(); // Clear corrupted data
      return null;
    }
  }

  /**
   * Clear all stored customer information
   */
  static clear(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.VERSION_KEY);
    console.log('Customer information cleared');
  }

  /**
   * Check if customer information exists
   */
  static exists(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }

  /**
   * Update specific fields of stored customer information
   */
  static update(partialInfo: Partial<CustomerInfo>): boolean {
    const existing = this.load();
    if (existing) {
      const updated = { ...existing, ...partialInfo };
      return this.save(updated);
    }
    return false;
  }

  /**
   * Get metadata about stored information
   */
  static getMetadata(): { savedAt: string; version: string } | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      const version = localStorage.getItem(this.VERSION_KEY);
      
      if (stored && version) {
        const parsed = JSON.parse(stored);
        return {
          savedAt: parsed.savedAt || 'Unknown',
          version: version
        };
      }
    } catch (error) {
      console.error('Error getting metadata:', error);
    }
    return null;
  }

  /**
   * Validate customer information completeness
   */
  static isComplete(customerInfo: CustomerInfo): boolean {
    const requiredFields: (keyof CustomerInfo)[] = [
      'firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'occupation'
    ];

    return requiredFields.every(field => 
      customerInfo[field] && customerInfo[field].trim().length > 0
    );
  }

  /**
   * Export customer information for debugging
   */
  static export(): string {
    const info = this.load();
    const metadata = this.getMetadata();
    
    return JSON.stringify({
      customerInfo: info,
      metadata: metadata,
      exportedAt: new Date().toISOString()
    }, null, 2);
  }
}
