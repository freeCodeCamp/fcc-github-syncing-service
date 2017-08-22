# fcc-github-syncing-service
A prototype for a service freeCodeCamp can use to sync camper progress between GitHub and freeCodeCamp.org

## Proposal

A microservice that receives post requests from Github, handles them and exposes an API. It would work in the following manner. The webhook for a repo is configured to point to the microservice endpoint. On receiving a request, the server would authenticate it and then decide how many points it was worth. It would then save this data to a MongoDB instance, which should exist solely for the microservice. The microservice would also expose an API through which this database could be accessed - e.g. getting the number of points that user 'githubUser' has.

```
			 MongoDB
				|
Github -> Microservice -> API
```
