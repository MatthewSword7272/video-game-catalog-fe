export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const body = await readBody(event)

    try {
        const data = await $fetch('https://api.igdb.com/v4/games/', {
          method: 'POST',
          headers: {
              'Client-ID': `${config.app.clientID}`,
              'Authorization': `Bearer ${config.app.accessToken}`,
          },
          body: body
        });
        console.log('API response:', data);
        return data;
      } catch (error) {
        console.error(error);
      }
})