// 'use server';
import { createHash } from 'crypto';

export const generateSeed = async (
  userSeed: string,
  pageNumber: number
): Promise<number> => {
  const combinedSeed = `${userSeed}-${pageNumber}`;
  const hash = createHash('sha256').update(combinedSeed).digest('hex');
  const randomNumber = parseInt(hash.slice(0, 8), 16);
  const seed = Math.floor((randomNumber / 0xffffffff) * 1e8);

  return seed;
};
