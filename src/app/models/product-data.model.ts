import { ProductStatus } from './product-status.enum';

/**
 * Defines data that is used in the inventory table
 */
export interface IProductData {
  id: any;
  // The name of the product
  name: string;
  //
  description: string;
  // Whether the product requires approval to be rented
  requiresApproval: boolean;
  //
  isDeleted: boolean;
  // The category of the product
  categoryId: string;
}
