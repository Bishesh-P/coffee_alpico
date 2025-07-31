# 🎯 SUPER EASY DISCOUNT MANAGEMENT GUIDE

## ✨ How to Add Discounts in 30 Seconds

### 📋 Quick Steps:
1. Open `src/utils/discountManager.ts`
2. Add product ID and discount percentage
3. Save file - discounts apply instantly!

### 🔥 Examples:

#### Add 20% discount to a product:
```typescript
export const PRODUCT_DISCOUNTS: Record<number, number> = {
  1: 20,    // Product ID 1 gets 20% off
  103: 15,  // Product ID 103 gets 15% off
  // Add more here...
};
```

#### Add 25% discount to specific variants:
```typescript
export const VARIANT_DISCOUNTS: Record<string, number> = {
  "whole-light-1kg": 25,     // 1kg variant gets 25% off
  "mug-black": 15,           // Black mug gets 15% off
  // Add more here...
};
```

### 🎨 Bulk Discount Campaigns:
```typescript
// Apply 15% discount to ALL coffee products at once
export const SEASONAL_CAMPAIGNS = {
  summerSale: {
    productIds: [1, 2, 3, 11, 12, 13, 21, 22, 23],
    discount: 15
  }
};
```

## 🚀 What You Get Automatically:

✅ **Strikethrough Original Prices** - Shows ~~NPR 1299~~ NPR 999  
✅ **Discount Percentage Badges** - Red "23% OFF" badges  
✅ **Works Everywhere** - Product cards, detail pages, cart, featured products  
✅ **Mobile Responsive** - Looks great on all devices  
✅ **No Manual Work** - Just add the discount percentage!  

## 📊 Current Active Discounts:

| Product | Original Price | Sale Price | Discount |
|---------|----------------|------------|----------|
| Light Roast Coffee | NPR 1,250 | NPR 1,050 | 16% OFF |
| 500g Light Roast | NPR 2,399 | NPR 1,999 | 17% OFF |
| Coffee Mug | NPR 1,399 | NPR 1,149 | 18% OFF |
| Black Mug | NPR 1,349 | NPR 1,149 | 15% OFF |
| Pour Over V60 | NPR 3,599 | NPR 2,999 | 17% OFF |

## 🎯 Pro Tips:

### Remove a Discount:
```typescript
// Just delete the line or comment it out
// 1: 20,  // This discount is now disabled
```

### Temporary Discount:
```typescript
// Use comments to temporarily disable
// 103: 15,  // Disabled for now
```

### Copy Discounts:
```typescript
// Copy entire sections for similar discounts
1: 20,   // Coffee 1
2: 20,   // Coffee 2  
3: 20,   // Coffee 3
```

### Bulk Find & Replace:
- Select multiple lines
- Find: `15` Replace: `25` (change all 15% to 25%)
- Find: `: 0` Replace: `: 20` (activate all 0% discounts to 20%)

## 🎪 Special Features:

### Flash Sales:
```typescript
// Set high discounts for flash sales
PRODUCT_DISCOUNTS = {
  1: 50,    // 50% off flash sale!
  2: 40,    // 40% off limited time!
};
```

### Seasonal Events:
```typescript
// Christmas special
const christmasSpecial = {
  productIds: [1, 2, 3, 101, 102, 103],
  discount: 30  // 30% off everything!
};
```

### Out of Stock Specials:
```typescript
// Higher discounts for items going out of stock
21: 35,  // Dark roast 35% off (clearing inventory)
```

---

## ⚡ That's It! 

**No complex code, no manual calculations, no repetitive work.**  
**Just add the percentage and watch the magic happen! 🪄**
