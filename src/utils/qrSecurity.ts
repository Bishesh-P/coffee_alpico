// Security configuration for QR codes and payment processing

export const SECURITY_CONFIG = {
  // Trusted domains for QR code images
  TRUSTED_QR_DOMAINS: [
    'gdtlqgnisicagjkadlca.supabase.co'
  ] as readonly string[],
  
  // Expected QR paths
  EXPECTED_QR_PATHS: [
    '/storage/v1/object/public/Products/'
  ],
  
  // Payment security warnings
  SECURITY_WARNINGS: {
    esewa: [
      'Always verify you\'re on the official eSewa app',
      'Double-check the payment amount before confirming',
      'Keep your payment receipt for verification',
      'Never share your eSewa PIN or password'
    ],
    khalti: [
      'Always verify you\'re on the official Khalti app',
      'Double-check the payment amount before confirming', 
      'Keep your payment receipt for verification',
      'Never share your Khalti PIN or password'
    ]
  }
} as const;

// Security validation functions
export const validateQRUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    
    // Check if domain is trusted
    const isTrustedDomain = SECURITY_CONFIG.TRUSTED_QR_DOMAINS.includes(parsedUrl.hostname);
    
    // Check if path is expected
    const hasValidPath = SECURITY_CONFIG.EXPECTED_QR_PATHS.some(path => 
      parsedUrl.pathname.includes(path)
    );
    
    // Ensure HTTPS
    const isSecure = parsedUrl.protocol === 'https:';
    
    return isTrustedDomain && hasValidPath && isSecure;
  } catch {
    return false;
  }
};

// QR code integrity check
export const verifyQRIntegrity = async (imageUrl: string): Promise<boolean> => {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    return response.ok && (contentType?.startsWith('image/') ?? false);
  } catch {
    return false;
  }
};