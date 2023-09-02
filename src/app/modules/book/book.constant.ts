export const bookFilterableFiled: string[] = [
  'search',
  'minPrice',
  'maxPrice',
  'category',
]
export const BookRelationalFields: string[] = ['categoryId']

export const bookSearchableFiled = ['title', 'genre', 'price', 'author']

export const BookRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
}
