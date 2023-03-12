import { Car } from "@/types/car";
import path from 'path';
import { promises as fs } from 'fs';

type FetchCarListParams = {
  bodyType?: 'all' | string
} 

export async function fetchCarList(params: FetchCarListParams): Promise<Car[]> {
  const carList = await readCarFileContents();

  if ((params?.bodyType ?? 'all') !== 'all') {
    return carList.filter((car: Car) => car.bodyType === params.bodyType)
  }

  return carList
}

export async function fetchCarById(id: string): Promise<Car | undefined> {
  const carList = await readCarFileContents();
  return Promise.resolve(carList.find((car: Car) => car.id === id))
}

export async function fetchBodyTypes(): Promise<string[]> {
  const carList = await readCarFileContents();
  return Array.from(new Set(carList.map((car: Car) => car.bodyType)))
}

async function readCarFileContents() {
  const jsonDirectory = path.join(process.cwd(), 'public', 'api');
  const fileContents = await fs.readFile(jsonDirectory + '/cars.json', 'utf8');
  const carList = JSON.parse(fileContents) as Car[];
  return carList;
}