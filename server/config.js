// Update below parameters when running on local instance

module.exports = {
  devURI: 'mongodb://localhost:27017/employees',
  prodURI: 'mongodb+srv://roshnet:oNcqOs5qzkCmh2jk@cluster0.llpcz.mongodb.net/employees?retryWrites=true&w=majority',
  dbName: 'employees',
  PORT: process.env.PORT || 3000
}
