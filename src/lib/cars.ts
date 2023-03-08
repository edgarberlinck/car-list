import { Car } from "@/types/car";
import path from 'path';
import { promises as fs } from 'fs';

export async function fetchCarList(): Promise<Car[]> {
  const jsonDirectory = path.join(process.cwd(), 'public', 'api');
  const fileContents = await fs.readFile(jsonDirectory + '/cars.json', 'utf8');
  return JSON.parse(fileContents)
}