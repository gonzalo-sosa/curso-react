export default function paginate<T>(items: T[], pageNumber: number, pageSize: number): T[] {
  const startIndex = pageSize * (pageNumber - 1);
  return items
      .slice(startIndex)
      .slice(0, pageSize);
}