export type InventoryItem = {
  id: number;
  name: string;
  category: string;
  unit: string;
  quantity: number;        // used in UI  // from backend
  reorder_level: number;
};
