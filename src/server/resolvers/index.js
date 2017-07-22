export default {
    Query: {
        helloWorld: async () => {
            return await new Promise((resolve, reject) => {
                resolve({ text: 'Hello World' });
            });
        },
    }
};