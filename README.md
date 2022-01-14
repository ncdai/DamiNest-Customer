# DamiNest Customer

## Install

```bash
git clone git@github.com:ncdai3651408/DamiNest-Customer.git
cd DamiNest-Customer

yarn install
```

## ENV

Create file `.env`

```bash
MONGODB_URL=
SECRET_KEY=
PORT=3000

MAILGUN_API_KEY=
MAILGUN_DOMAIN=
```

## Run

### Development

```bash
# start node project
yarn dev

# start sass compiler
yarn sass:watch
```

### Production

```bash
# start node project
yarn start

# or
yarn global add pm2
yarn pm2:start
```

## VS Code Config

### Extensions

You can see a list of recommended extensions using **Show Recommended Extensions**, which sets the `@recommended filter`. Extension recommendations can either be :

- Workspace Recommendations - Recommended by other users of your current workspace.
- Other Recommendations - Recommended based on recently opened files.

Recommended extensions

- StandardJS - JavaScript Standard Style [https://marketplace.visualstudio.com/items?itemName=standard.vscode-standard]
- VS Code SCSS Formatter [https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter]
- EJS Language Support [https://marketplace.visualstudio.com/items?itemName=DigitalBrainstem.javascript-ejs-support]