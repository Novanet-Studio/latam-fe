interface Body {
  token: string;
  cedula: string;
}

export default defineEventHandler(async (event) => {

  return {
    message: "hola"
  }
  // const { usersApi, usersApiKey } = useRuntimeConfig(event);

  // try {
  //   const data = (await readBody(event)) as Body;

  //   const response = await fetch(`${usersApi}/GetClientsDetails`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       token: usersApiKey,
  //       cedula: data.cedula
  //     })
  //   });

  //   const json = await response.json();

  //   return json;
  // } catch (error: any) {
  //   return createError({
  //     statusCode: 500,
  //     message: "Error Interno del Servidor, intente otra vez",
  //   })
  // }
})