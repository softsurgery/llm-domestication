export const getPaginationMeta = (totalDocs: number, page: number, limit: number) => {
  const totalPages = Math.ceil(totalDocs / limit)
  const hasPrevPage = page > 1
  const hasNextPage = page < totalPages

  const startIndex = (page - 1) * limit + 1
  const endIndex = Math.min(page * limit, totalDocs)

  return {
    totalDocs,
    limit,
    page,
    totalPages,
    hasPrevPage,
    hasNextPage,
    startIndex,
    endIndex,
  }
}
