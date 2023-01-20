export interface Item {
    id: string
    module: string
    unit_amount: number
    quantity: number
}

export class ItemData {
    id: string
    module: string
    unit_amount: number
    quantity: number
    total_by_item: number

    constructor({ id, module, unit_amount, quantity }: Item) {
        this.id = id
        this.module = module
        this.unit_amount = unit_amount
        this.quantity = quantity
        this.total_by_item = this.unit_amount * this.quantity
    }
}
