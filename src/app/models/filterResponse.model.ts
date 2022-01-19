
import { Order } from "./order.model";

export interface FilterResponse {
    orders: Order[];
    result: number;
    total: number; 
}