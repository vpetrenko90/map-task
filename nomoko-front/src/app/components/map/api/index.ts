import { useQuery } from 'react-query';

const BASIC_URL = process.env.REACT_APP_API_HOST;

async function getList<Entity>(url: string): Promise<Entity[]> {
  const response = await fetch(url);
  return response.json();
}

export const useFetchMarkers = () =>
  useQuery<any>(['markers'], () => getList(`${BASIC_URL}/geo`));
