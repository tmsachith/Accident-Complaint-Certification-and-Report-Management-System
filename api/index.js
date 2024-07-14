import express from 'express';// using express we can work with back end and the API s

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
);