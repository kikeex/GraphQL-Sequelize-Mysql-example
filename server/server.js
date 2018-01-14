import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from '../schema/schema';
import { APP_PORT } from '../config';

const app = Express();

app.use(
    '/graphql',
    GraphHTTP({
        schema: Schema,
        pretty: true,
        graphiql: true,
    })
);

app.listen(APP_PORT, () => {
    console.log(`App listening on port ${APP_PORT}`);
});
