interface Body {
  token: string;
  cedula: string;
}

export default defineEventHandler(async (event) => {
  const { usersApi, usersApiKey } = useRuntimeConfig().public;

  try {
    const data = (await readBody(event)) as Body;

    const response = await $fetch(`${usersApi}/GetClientsDetails`, {
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