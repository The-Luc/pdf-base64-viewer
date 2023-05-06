## How to start the local development?

Note: Node version: 16

- `yarn install` to install dependencies

Submit base64 image to

```bash
POST http://localhost:9000/.netlify/functions/api
Content-Type: application/json
{
  base64: 'string of base 64'
}
```
