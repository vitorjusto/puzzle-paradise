
export function calculateClues(solution: number[]): number[] {
  const clues: number[] = [];
  let currentCount = 0;

  for (const cell of solution) {
    if (cell === 1) {
      currentCount += 1;
    } else if (currentCount > 0) {
      clues.push(currentCount);
      currentCount = 0;
    }
  }

  if (currentCount > 0 || clues.length === 0) {
    clues.push(currentCount);
  }

  return clues;
}