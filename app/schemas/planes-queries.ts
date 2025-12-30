const getPlanesInternetQuery = `
    query {
        planInternet {
            tipo {
            nombre
            descripcion
            planes {
                id
                nombre
                precio_usd
               }
            }
        }
    }
  `;

export { getPlanesInternetQuery };
