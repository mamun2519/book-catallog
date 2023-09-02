export type IOrderRequest = {
  orderedBooks: [
    {
      bookId: string
      quantity: number
    },
  ]
}

export type IOrderResponse = {
  id: string
  userId: string
  orderedBooks: {
    bookId: string
    quantity: number
  }
}
