

export async function sendmessage(data){
    const response = await fetch(`Http://localhost:1337/reservation`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      let json;
      if (response.headers.get('content-type').includes('text/html')) {
        const message = await response.text();
        json = {
          message,
        };
      } else {
        json = await response.json();
      }
      if (response.ok) {
        return json;
      }
      const error = new Error(json.message);
      error.response = json;
      throw error;
}