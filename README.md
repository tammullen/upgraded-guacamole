# Coverage tool automation PoC

A PoC project that demonstrates using Puppeteer to create tests and capture the data from Chrome Coverage tool and output it to a blog post

## Prerequisites

#### Make sure you have node-js installed

`npm install`

#### To run the specs

`npm test`


#### Environment variables / Options
key | what for | is env variable?
--- | --- | ---
calypsoBaseUrl | base URL | no (`config.js`)
headless | if tests run in headless mode | no (`config.js`)
mochaTimeout | timeout | no (`config.js`)
testUserName | username for login | yes
testPassword | password for login | yes
mailosaurApiKey | master key to access mailosaur api | yes
signupInboxId | inbox id for mailosaur | yes
passwordForNewTestSignUps | password for signups | yes
outputTarget | output coverage to local file ('local') or blog post ('WPCOM') | no (`config.js`)
outputWordPressName | output blog name | yes
outputWordPressAPIKey | key for writing to blog | yes

If you don't like to add environment variables, just create a file called `.env` and prefill it with the variables from above like this:
```sh
defaultUser=myloginusername
defaultPassword=myamazingpassword
... etc
```