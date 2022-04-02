//Levanta el servidor
const app = require('./src/app')

const PORT =  process.env.PORT || 8080

app.listen(PORT , () => {
    console.log(`Server Listening on http://localhost:${PORT}`)
})