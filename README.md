# Steps to reproduce issue

1. run `npm run watch`
2. scroll faster that data is being loaded and observe duplicated requests to API are triggered

NOTE: There is also ServerSideLazyLoadingViewportWorkaround with workaround in form of storing pending promises and checking for duplicated getRows executions.
