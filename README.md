# Node Backend For Blog API with MongoDB

This is a Node Application for dealing with MongoDB CRUD Operation.

## Technologies

Project is created with:

- Node.js
- Express.js
- Mongoose
- Mongodb
- Unit Tests & Integration Tests
- JWT

## Requirements

- Node 14+
- Git

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/anupamsahoo/blogs-node-backend.git
cd blogs-node-backend
```

Create .env file on root

```.env
MONGODB_URI=[Update your MongoDB Server Details]
PORT=3001
```

```bash
npm install
```

```bash
npm start
```

or

```bash
npm run dev
```

## Usage

```code
#Add New
POST /api/blogs HTTP/1.1
Host: localhost:3001
Content-Type: application/json
Content-Length: 501

{
    "title": "Discovering the Hidden Gems of Kyoto, Japan",
    "content": "Japan is a fascinating country that's rich in culture and history. While most travelers visit the bustling cities of Tokyo and Osaka, I recently had the opportunity to explore the quieter, more traditional city of Kyoto. In this post, I'll share my experiences and recommendations for discovering the hidden gems of Kyoto.",
    "author": "author name",
    "url":"discovering-the-hidden-gems-of-kyoto-japan"
}

#Fetch all blogs
GET /api/blogs/ HTTP/1.1
Host: localhost:3001

#Fetch one blog
GET /api/blogs/:id HTTP/1.1
Host: localhost:3001

#Update blog
PUT /api/blogs/:id HTTP/1.1
Host: localhost:3001
Content-Type: application/json
Content-Length: 507

{
    "title": "Discovering the Hidden Gems of Kyoto, Japan",
    "content": "Japan is a fascinating country that's rich in culture and history. While most travelers visit the bustling cities of Tokyo and Osaka, I recently had the opportunity to explore the quieter, more traditional city of Kyoto. In this post, I'll share my experiences and recommendations for discovering the hidden gems of Kyoto",
    "author": "Sujata",
    "url":"discovering-the-hidden-gems-of-kyoto-japan"
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
