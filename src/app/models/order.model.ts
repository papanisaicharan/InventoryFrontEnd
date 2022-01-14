

export interface Order {
    orderId: string;
    productName: string;
    productId: string;
    totalPrice: number;
    orderedOn: string;
    quantity: number;
    distributorName: string;
    distributorId: string;
    deliveryAddress: string;
}