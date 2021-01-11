import fetch from 'isomorphic-unfetch'

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
}
export const post = async <T>(
  url: string,
  data: Record<string, unknown>
): Promise<T> => {
  console.log('POST:', getUri(url))
  return await fetcher(getUri(url), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      accept: 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
  })
}

export const get = async <T>(url: string): Promise<T> => {
  console.log('GET:', getUri(url))
  return await fetcher(getUri(url), {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      accept: 'application/json; charset=utf-8',
    },
  })
}

function getUri(url: string): string {
  if (process.browser) return url
  if (process.env.NODE_ENV === 'production')
    return `${process.env.URI_PRODUCTION}${url}`
  return `${process.env.URI_DEVELOPMENT}${url}`
}
