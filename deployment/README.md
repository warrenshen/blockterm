## Local Deployment

Preparation: Install `docker` and `docker-compose` for your machine.

Steps to run on local:

1. In `crypto-trends/`, run the command `sh build-dev.sh` and this will create docker images for you
2. You have two options to run the service locally:
	i. Go into `deployment/` and run `docker-compose up`. This will bring up all the services and print out logs into your terminal. This is the easiest way to have everything up and running.
	ii. Run the client service by itself and mount local directory. An example command: `docker-compose run -v <local_directory>/crypto-trends/client:/dev_client/ -p 3000:3000 client bash -c "cd /dev_client && npm install && npm start"`. This will reinstall all the packages and allow the container to share the local directory, thus enabling hot reloading for client dev.

If the database has not been initialized, run

`docker-compose run server rails db:create db:migrate db:seed` to have the db initialized

### Hot reloading

For hot-reloading server and client code, you can run the following two commands:

```
docker-compose run -v <local_directory>/crypto-trends/server:/dev_server/ -p 8080:8080 server bash -c "cd /dev_server && bundle install && bundle exec rails s -p 8080 -b '0.0.0.0'"
```

and

```
docker-compose run -v <local_directory>/crypto-trends/client:/dev_client/ -p 3000:3000 --no-deps client bash -c "cd /dev_client && npm install && npm start"
```

This essentially allows you to start the server and client separately while mounting the local directory in the docker container. Note that the `--no-deps` in the client start command is essential because otherwise your client will start the whole dependency and run server twice.

Tips and tricks:

* Sometimes if the server is not shut down properly, you will have remaining files. You can do
`rm /crypto-trends/server/tmp/pids/server.pid` and it usually fixes the issue.
* The client container usually takes longer to bring up because of the `npm install`, however, you don't have to take it down most of the time, so you can just leave it sitting there. On the other hand, if the server halts due to bug, you can easily restart by hitting `ctrl-C` and wait for the server to perform a shutdown before bringing it back up.

## For deployment on Kubernetes:

Preparation:

1. Configure `gcloud` and `kubectl`. Make sure `kubectl` has the right authentication to the cluster.
2. Install `kompose` with homebrew (or source if on linux). `brew install kompose`

Steps to deploy:

1. In `deployment/`, run `kompose convert`. This will create both service and deployment files for each docker-compose service specified in the `docker-compose.yaml` file.
2. Run `kubectl apply -f <service>-deployment.yaml, <service>-service.yaml`

Useful commands:

* Monitor the status using `kubectl get services`, `kubectl get deployments`, `kubectl get pods`
* See logs, `kubectl logs <pod_id>`
* Run command `kubectl exec <pod_id> -- <command>`