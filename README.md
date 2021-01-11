# GitCMS

A CMS based directly on Github

## Stack

- React with Typescript
- Next.JS
- TailwindCSS
- Tailwind Typography
- Storybook

## Verification Email

```json
GET http://localhost:3000/api/auth/providers
returns
{
google: {
id: "google",
name: "Google",
type: "oauth",
signinUrl: "http://localhost:3000/api/auth/signin/google",
callbackUrl: "http://localhost:3000/api/auth/callback/google"
},
github: {
id: "github",
name: "GitHub",
type: "oauth",
signinUrl: "http://localhost:3000/api/auth/signin/github",
callbackUrl: "http://localhost:3000/api/auth/callback/github"
},
email: {
id: "email",
name: "Email",
type: "email",
signinUrl: "http://localhost:3000/api/auth/signin/email",
callbackUrl: "http://localhost:3000/api/auth/callback/email"
}
}
```

http://localhost:3000/api/auth/verify-request?provider=email&type=email

POST "http://localhost:3000/api/auth/signin/email"
{
name=csrfToken
name=email
}

http://localhost:3000/api/auth/callback/email?email=tobias.klemmer%40wuerth-it.com&token=c70229f95d1802c0ebf2ee409b5b607a1f5944f7cb9ec0479573824f9cbd6631
