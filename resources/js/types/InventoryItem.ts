export type InventoryItem = {
  id: number;
  name: string;
  category: string;
  unit: string;
  current_stock: number;       
  reorder_level: number;
  description: string | null;
};
