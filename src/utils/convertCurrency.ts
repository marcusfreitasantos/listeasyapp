export function reaisToCents(valor: number): number {
  return Math.round(valor * 100);
}

export function centsToReais(centavos: number): number {
  return centavos / 100;
}
