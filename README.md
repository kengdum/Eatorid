# Eatorid


Deployed [here on Render](https://eat-or-yeet.onrender.com) (it might take a while to load since I'm using the free version 💩)

If you want to run this bad boy locally, you need a little bit of setup

1. Make sure you have a MongoDB account and a free cluster on Atlas (go with the defaults).
2. Inside `backend` directory make sure you create a `.env` file with these 2 keys: <br /> 1. `DATABASE_URL` (e.g. `DATABASE_URL=mongodb+srv://YOUR_USERNAME_HERE:YOUR_PASSWORD_HERE@cluster0.0z80swp.mongodb.net/`) <br /> 2. `ACCESS_TOKEN_SECRET` (e.g. `ACCESS_TOKEN_SECRET=dowiajd2io1dlkamLWAKDadasCASDWA`)
3. Inside `frontend` directory make sure you crate a `.env` file with one key: <br /> `REACT_APP_CART_SECRET` (e.g. `REACT_APP_CART_SECRET=diwoajoi213dnwajdnu1h`)

If these steps are followed, you are good to go. Open the terminal, go inside `backend` and run `npm run serve` to start the server and on another terminal instance go to `frontend` and run `npm start`

If something doesn't work, just test the app [here on Render](https://eat-or-yeet.onrender.com) 😳
