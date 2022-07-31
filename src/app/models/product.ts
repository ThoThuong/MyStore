export interface Product {
    id: string
    name: string
    price: number
    url: string
    description: string
}


export interface OrderProduct extends Product {
    orderQuantity: number
}