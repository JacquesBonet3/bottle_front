# bottle_front



This project use refine

This [refine](https://github.com/refinedev/refine) project was generated with [superplate](https://github.com/pankod/superplate).

## Getting Started

**refine** is a React-based framework for building data-intensive applications in no time ✨

Refine offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. Use-cases include, but are not limited to admin panels, B2B applications and dashboards.

## Available Scripts

```bash
    npm install
```

### Running the development server.

```bash
    npm run dev
```

### Building for production.

```bash
    npm run build
```

### Running the production server.

```bash
    npm start
```

## The application

The application need to modify energie_win_back_main to authorize CORS


## Problems

### Delete bottle

We have the following error on the back end:

ERROR [ExceptionsHandler] update or delete on table "bottle" violates foreign key constraint "bottle_price_history" on table "bottle_price_history"

The REST interface don't provide a endpoint to delete row in the bottle_price_history history.
DELETE actions are only possible on /bottles/{id} et /notes/{id}.

### Filters

Filter is very basic. 

### Refresh 

There is a problem on explicit application refresh

## Access token

Access token expiration has not been tested


## Learn More

To learn more about **refine**, please check out the [Documentation](https://refine.dev/docs)

- **REST Data Provider** [Docs](https://refine.dev/docs/core/providers/data-provider/#overview)
- **Mantine** [Docs](#)
- **Inferencer** [Docs](https://refine.dev/docs/packages/documentation/inferencer)
- **React Router** [Docs](https://refine.dev/docs/core/providers/router-provider/)


## License

MIT
