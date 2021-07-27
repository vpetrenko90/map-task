const BASIC_URL = process.env.REACT_APP_API_HOST;

async function getList<Entity>(url: string): Promise<Entity[]> {
  const response = await fetch(url);
  return response.json();
}

export const getMarkers = () => {
  return getList(`${BASIC_URL}/geo`);
};

export const getPrice = ({ lng, lat }: any): Promise<any> => {
  return getList(`${BASIC_URL}/geo/price?long=${lng}&lat=${lat}`);
};
