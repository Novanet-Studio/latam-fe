export default function request(config = null) {
  return {
    get: async (uri) => {
      const response = await fetch(uri, {
        ...config,
        method: 'GET',
      })
      const result = await response.json()
      
      return result
    },
    post: async (uri, data) => {
      const response = await fetch(uri, {
        ...config,
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json()

      return result
    }
  }
}