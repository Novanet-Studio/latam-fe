const postCreatePaymentQuery = `
    mutation crearPago($data: PagoInput!) {
        createPago(data: $data) {
            documentId
            id 
        }
    }
`;

const getPaymentMessageQuery = `
    query {
      datosDePago {        
            mensaje_formulario
        }
    }
`;

export { postCreatePaymentQuery, getPaymentMessageQuery };
