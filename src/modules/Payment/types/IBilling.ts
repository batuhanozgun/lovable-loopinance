
/**
 * Fatura adresi bilgilerini tanımlar
 */
export interface IBillingAddress {
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

/**
 * Fatura bilgilerini tanımlar
 */
export interface IBillingDetails {
  fullName: string;
  email: string;
  address: IBillingAddress | string;
  city?: string;
  zipCode?: string;
  country?: string;
}
