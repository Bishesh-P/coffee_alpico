export interface FAQItem {
  question: string;
  answer: string;
  id: string;
  iconName?: string;
}

export const homeFAQs: FAQItem[] = [
  {
    id: "coffee-freshness",
    question: "How fresh is your Nepal coffee?",
    answer: "We roast all our premium Arabica coffee beans fresh to order and ship within 24-48 hours of roasting. This ensures you receive the freshest Nepal coffee possible, typically within 2-5 days of the roast date for optimal flavor and aroma.",
    iconName: "Coffee"
  },
  {
    id: "shipping-delivery",
    question: "What's your coffee delivery policy in Nepal?",
    answer: "We offer free coffee delivery on orders over Rs 2000 within the Kathmandu Valley (Kathmandu, Bhaktapur, and Lalitpur). Orders outside the valley have a flat shipping rate of NPR 150 regardless of order amount. All coffee orders are processed within 1-2 business days within the Kathmandu Valley and typically arrive within 3-4 business days outside the valley.",
    iconName: "Truck"
  },
  {
    id: "quality-guarantee",
    question: "Do you guarantee the quality of your specialty coffee?",
    answer: "Absolutely! We stand behind the quality of our specialty Nepal coffee. If you're not completely satisfied with your premium coffee purchase, contact us within 30 days for a full refund or exchange. Your coffee satisfaction is our priority.",
    iconName: "Shield"
  },
  {
    id: "coffee-storage",
    question: "How should I store my coffee beans properly?",
    answer: "Store your Arabica coffee beans in an airtight container in a cool, dark place away from direct sunlight, heat, and moisture. Avoid storing coffee in the refrigerator or freezer. Use within 2-4 weeks of the roast date for best coffee flavor.",
    iconName: "Package"
  },
  {
    id: "wholesale-pricing",
    question: "Do you offer wholesale coffee or bulk coffee pricing?",
    answer: "Yes! We offer competitive wholesale coffee pricing for cafes, restaurants, offices, and bulk coffee orders. Contact our wholesale team at alpicocoffeecompany@gmail.com for custom coffee pricing and minimum order requirements.",
    iconName: "HelpCircle"
  },
  {
    id: "brewing-methods",
    question: "What coffee brewing methods work best with your beans?",
    answer: "Our Nepal coffee beans are versatile and work well with various brewing methods. Light roast coffee excels in pour-over and drip coffee methods, medium roast coffee is perfect for espresso machines and French press, while dark roast coffee shines in espresso and cold brew preparations.",
    iconName: "Clock"
  }
];

export const contactFAQs: FAQItem[] = [
  {
    id: "order-tracking",
    question: "How can I track my order?",
    answer: `Track your Alpico Coffee order easily through multiple channels:<br><br>
    • <strong>Order Confirmation:</strong> You'll receive confirmation with order details<br>
    • <strong>Phone Support:</strong> Call (+977) 986-9062187 for immediate assistance<br>
    • <strong>Instagram DM:</strong> Message @alpicocoffee for quick updates<br>
    • <strong>Email Support:</strong> Contact alpicocoffeecompany@gmail.com<br>
    • <strong>WhatsApp:</strong> Direct messaging for real-time order updates<br><br>
    We're available 7 days a week to help with your order inquiries and provide status updates.`
  },
  {
    id: "payment-methods",
    question: "What payment methods do you accept?",
    answer: `We accept multiple secure payment options for your convenience:<br><br>
    • <strong>eSewa:</strong> Instant digital wallet payment<br>
    • <strong>Khalti:</strong> Quick mobile wallet transfer<br>
    • <strong>IME Pay:</strong> Secure mobile banking solution<br>
    • <strong>Cash on Delivery:</strong> Pay when you receive your order<br>
    • <strong>Bank Transfer:</strong> Direct bank account transfer<br><br>
    All online payments are processed securely. Cash on Delivery is available for all delivery zones across Nepal.`
  },
  {
    id: "return-policy",
    question: "What is your return and refund policy?",
    answer: `We stand behind the quality of our coffee with a comprehensive guarantee:<br><br>
    • <strong>Quality Guarantee:</strong> 100% satisfaction guarantee on all products<br>
    • <strong>Return Window:</strong> 7 days from delivery for unopened packages<br>
    • <strong>Damaged Products:</strong> Immediate replacement or full refund<br>
    • <strong>Quality Issues:</strong> Contact us within 24 hours of delivery<br>
    • <strong>Easy Process:</strong> Email us photos and description for quick resolution<br><br>
    Customer satisfaction is our top priority. We'll make it right if you're not completely satisfied.`
  },
  {
    id: "bulk-orders",
    question: "Do you offer bulk orders for offices or events?",
    answer: `Yes! We cater to bulk orders and corporate clients with special services:<br><br>
    • <strong>Office Subscriptions:</strong> Regular delivery for workplace coffee needs<br>
    • <strong>Event Catering:</strong> Fresh coffee for meetings, conferences, and events<br>
    • <strong>Custom Packaging:</strong> Branded packaging for corporate gifts<br>
    • <strong>Volume Discounts:</strong> Special pricing for orders above 5kg<br>
    • <strong>Consultation:</strong> Free brewing setup and training for offices<br><br>
    Contact us at alpicocoffeecompany@gmail.com or call (+977) 986-9062187 for custom bulk pricing and corporate solutions.`
  },
  {
    id: "subscription-service",
    question: "Do you offer coffee subscription services?",
    answer: `Yes! Our coffee subscription service ensures you never run out of fresh coffee:<br><br>
    • <strong>Flexible Frequency:</strong> Weekly, bi-weekly, or monthly delivery options<br>
    • <strong>Customization:</strong> Choose your preferred roast profiles and quantities<br>
    • <strong>Priority Roasting:</strong> Subscribers get first priority on fresh roasts<br>
    • <strong>Exclusive Discounts:</strong> 10% off regular prices for all subscribers<br>
    • <strong>Easy Management:</strong> Pause, skip, or cancel anytime through our support<br><br>
    Subscribe today and enjoy the convenience of regular fresh coffee delivery to your doorstep!`
  },
  {
    id: "brewing-equipment",
    question: "Do you sell coffee brewing equipment?",
    answer: `Yes! We offer a complete range of brewing equipment and accessories:<br><br>
    • <strong>Pour Over Equipment:</strong> V60 drippers, filters, and kettles<br>
    • <strong>French Press:</strong> Various sizes for different household needs<br>
    • <strong>Grinders:</strong> Manual and electric coffee grinders<br>
    • <strong>Scales:</strong> Precision scales for perfect brewing ratios<br>
    • <strong>Accessories:</strong> Cups, mugs, and storage containers<br><br>
    All equipment comes with brewing guides and tips to help you make café-quality coffee at home.`
  }
];
