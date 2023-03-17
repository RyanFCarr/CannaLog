interface HttpResponse<T> extends Response {
  parsedBody?: T;
}
export async function http<ResponseType>(
  input: RequestInfo
): Promise<HttpResponse<ResponseType>> {
  const response: HttpResponse<ResponseType> = await fetch(input);

  try {
    // may error if there is no body
    response.parsedBody = await response.json();
  } catch (ex: any) {
    console.log("HTTP Error", ex.message);
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response;
}
export async function get<ResponseType>(
  url: string,
  args: RequestInit = { method: "GET" }
): Promise<HttpResponse<ResponseType>> {
  return await http<ResponseType>(new Request(url, args));
}
export async function post<RequestType, ResponseType>(
  url: string,
  body: RequestType,
  args: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<ResponseType>> {
  return await http<ResponseType>(new Request(url, args));
}
export async function put<RequestType, ResponseType>(
  url: string,
  body: RequestType,
  args: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }
): Promise<HttpResponse<ResponseType>> {
  return await http<ResponseType>(new Request(url, args));
}
