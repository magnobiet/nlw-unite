export function generateSlug(text: string): string {
  return text
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036F]/g, '')
    .toLowerCase()
    .replaceAll(/[^\s\w-]/g, '')
    .replaceAll(/\s+/g, '-');
}
