import { auth } from "@/auth";

export const requestClient = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const session = await auth();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const response = await fetch(`${baseUrl}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(session?.user && { authorization: `Bearer ${session?.user.token}` }),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const { message } = await response
      .json()
      .catch(() => ({ message: response.statusText }));

    throw new Error(message);
  }

  return (await response.json()) as T;
};
