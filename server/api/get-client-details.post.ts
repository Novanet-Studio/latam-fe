interface Body {
  token: string;
  cedula: string;
}

const testAPI = 'https://private-anon-0c49753ae6-mikrowisp.apiary-mock.com/api/v1'

export default defineEventHandler(async (event) => {
  const { usersApi, usersApiKey } = useRuntimeConfig().public;

  const api = import.meta.env.DEV ? testAPI : usersApi

  try {
    const data = (await readBody(event)) as Body;

    const response = await $fetch(`${api}/GetClientsDetails`, {
      method: 'POST',
      body: {
        token: usersApiKey,
        cedula: data.cedula
      }
    });

    return response;
  } catch (error: any) {
    return createError({
      statusCode: 500,
      message: "Error Interno del Servidor, intente otra vez",
    })
  }
})