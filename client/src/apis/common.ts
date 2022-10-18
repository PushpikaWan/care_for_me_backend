export async function createGetRequest(url: string): Promise<Request> {
  const headers = new Headers();
  return new Request(url, {
    method: 'GET',
    headers,
    mode: 'cors',
    cache: 'default'
  });
}