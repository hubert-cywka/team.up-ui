# Team.Up (WIP)
![home_page.png](media/home_page.png)
Ever wanted to find a team to play some football or find a partner to go to gym? Team.Up allows you to do so! Create your own sport event or join existing one and keep up your healthy lifestyle!

## Built with
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

## Features
At this moment only few of mentioned below features are implemented.

### What can user do?
- create account and sign in ✅
- authenticate using JWT and refresh tokens ✅
- browse sport disciplines and sport events ✅
- enroll for the event ⌛
- filter events by sports, popularity, location, time, etc. ⌛
- add, modify or delete own events ⌛
- change username, password, profile picture ⌛

### What can admin do?
- everything user can do ✅
- add, modify or delete sport events ⌛
- add, modify or delete available sport disciplines ✅
- change users roles, suspend users accounts ⌛
- filter users by username or email ⌛


## Backend
Backend was created in Express.js, available at: https://github.com/hejs22/team.up-back


## Instruction

First run `npm install`, then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Config
`NEXT_PUBLIC_API_URL` - backend url

`NEXTAUTH_URL` - Next Auth URL, default: `http://localhost:3000/api/auth`

`NEXTAUTH_SECRET` - Next Auth secret

`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API Key, necessary to make maps works.


## Gallery

![home_page.png](media/home_page.png)

![events.png](media/events.png)

![add_event_form.png](media/add_event_form.png)

![sign_up_form.png](media/sign_up_form.png)

![sign_out_alert.png](media/sign_out_alert.png)

