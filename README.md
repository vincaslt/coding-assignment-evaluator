This is an application for creating a programming task for other people to solve.
After each submission, the task is run against tests, and the solution is given
which tests have failed/succeeded.

There is a live demo of the app here: https://coding.stonyvin.net


There are three main pages: admin, task and results.
To see how admin console works - go to: https://coding.stonyvin.net/admin
To make changes enter the password: `bvzRTaz21x`

Tests must be in JSON format, like:
```
tests: array of {
  arguments: Array of valid JS types,
  result: valid JS type
}
```

Executable function is the same as the function name in code, e.x.:

```
// code
function solve(a, b) { /* something */ }
```

The function name must be `solve`


Front end is react/redux
Backend is node/express
