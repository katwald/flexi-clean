## Available Scripts

[Live URL](https://flexi-clean-api.onrender.com/)

In order to run this app in your local environment.You will also need an API in order to authenticate and navigate this app. For that you will need to clone
[this api](https://github.com/katwald/flexi-clean-API)
Front End local run

    npm install    // installs all the needed library.
    npm start     // Runs the app in development mode.

    API local run
    $ npm install

EITHER

goto front end app and change base url paths from relative to absolute paths eg: http://localhost:3001/login

OR

simply run

    $ npm run build:ui

In the browser go to

    http://localhost:3001/

First Login as admin using below credential.

        email: katwaldevendra1@gmail.com
        temporary password :  devendra

After logged in as admin/supervisor you can add new employee by pressing Add New button and filling up the signUp form.
in order to see employee level functionality you need to signIn as employee using credentials you recently added.f

# FlexiClean app

- A company has few cottages where customer visits for a day, night or for a week.After every bookings venue needs cleaning. Since the cleaning time varies depending on the type of booking.Due this fact company needs several part time cleaners who can assign themselves to the work whenever they have time to do so.

Using FlexiClean app

As a Cleaner you can:

- login to the app.
- view list of upcoming bookings and cleaning schedule.
- assign shift to themselves if that fits to their schedule.
- view their upcoming schedule in my schedule page.
- cancel the shift.
- comment cleaning related issue. eg. writ about lost and found items, broken items etc.

As a SuperVisor you can

- signIn to the app.
- add information of upcoming booking date, cleaning date and its description.
- Edit or remove bookings if needed.
- add new employee( First Employee signUp is done only by supervisor).
- comment back to the cleaners comment.
- view the booking schedule, assigned cleaning.

TODO

[reference](https://fullstackopen.com/en/)
