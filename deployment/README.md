# Development 101

## Local Deployment

Preparation: Install `docker` and `docker-compose` for your machine.

Steps to run on local:

1. In `blockterm/`, run the command `sh build-dev.sh` and this will create docker images for you
2. You have two options to run the service locally:
	* Go into `deployment/` and run `docker-compose up`. This will bring up all the services and print out logs into your terminal. This is the easiest way to have everything up and running.
	* Run the client service by itself and mount local directory. An example command: `docker-compose run -v <local_directory>/blockterm/client:/dev_client/ -p 3000:3000 client bash -c "cd /dev_client && npm install && npm start"`. This will reinstall all the packages and allow the container to share the local directory, thus enabling hot reloading for client dev.

If the database has not been initialized, run

`docker-compose run server rails db:create db:migrate db:seed` to have the db initialized

### Hot reloading

For hot-reloading server and client code, you can run the following two commands:

```
docker-compose run -v <local_directory>/blockterm/server:/dev_server/ -p 9999:80 server bash -c "cd /dev_server && bundle install && bundle exec rails s -p 8080 -b '0.0.0.0'"
```

and

```
docker-compose run -v <local_directory>/blockterm/client:/dev_client/ -p 3000:80 --no-deps client bash -c "cd /dev_client && npm install && npm start"
```

This essentially allows you to start the server and client separately while mounting the local directory in the docker container. Note that the `--no-deps` in the client start command is essential because otherwise your client will start the whole dependency and run server twice.

Tips and tricks:

* Sometimes if the server is not shut down properly, you will have remaining files. You can do
`rm /blockterm/server/tmp/pids/server.pid` and it usually fixes the issue.
* The client container usually takes longer to bring up because of the `npm install`, however, you don't have to take it down most of the time, so you can just leave it sitting there. On the other hand, if the server halts due to bug, you can easily restart by hitting `ctrl-C` and wait for the server to perform a shutdown before bringing it back up.
* Command line commands will need to be run in a similar fashion as the above two commands, for example to perform a database reset you can do `docker-compose run -v <local_directory>/server:/dev_server/ -p 9999:80 server bash -c "cd /dev_server && rails db:reset"`.

# Kubernetes Deployment 101

## Preparation:

We are using `gcloud` for serving and `helm` for some tool dependencies, so you will need them on your setup to use the configs.

1. Configure `gcloud` and `kubectl`. Make sure `kubectl` has the right authentication to the cluster.
2. Install `helm` by running `brew install kubernetes-helm`

## Deployment

### Project Setup (Mostkt for the first time users)

* List projects: `gcloud projects list`
* Set project: `gcloud set project [project-id]`
* Create a container cluster, example command: `gcloud container clusters create [cluster-name] --machine-type=f1-micro --disk-size=20 --num-nodes=3 --tags=production [--enable-autoscaling --max-nodes=4]`

* List all the clusters: `gcloud container clusters list`
* Get credential for the cluster: `gcloud container clusters get-credentials [cluster-name]`

### Build Images

* Run `dev-build.sh`, make sure the tag matches your `project_id`
* Check local builds: `docker images`
* Push images: `gcloud docker -- push us.gcr.io/block-191602/client`

If you cannot push the images with access errors, make sure you get the gcloud cluster credentials from the last step

### Create DB Volumes \[Optional\]

Suppose the name is `pg-db-disk` and your instance_id is `gke-prod-default-pool-92e96811-2qxm`;

* Create disk: `gcloud compute disks create pg-db-disk --description='postgres data disk' --size=20GiB`
* Attach the disk to an instance: `gcloud compute instances attach-disk gke-prod-default-pool-92e96811-2qxm --disk=pg-db-disk`
* Go to the instance, check the disk: `lsblk`
* Format the disk `sudo mkfs.ext4 -m 0 -F -E lazy_itable_init=0,lazy_journal_init=0,discard /dev/[device-id]`, usually the `device-id` is `sdb`
* Make a mount point: `sudo mkdir -p /mnt/disks/[MNT_DIR]`
* Mount the disk: `sudo mount -o discard,defaults /dev/[device-id] /mnt/disks/[MNT_DIR]`
* Change permission: `sudo chmod a+w /mnt/disks/[MNT_DIR]`
* Go in and remove the `lost+found` directory `cd /mnt/disks/[MNT_DIR]`, `rm -rf lost+found`
* Detach the volume: `gcloud compute instances detach-disk gke-prod-default-pool-92e96811-2qxm --disk=pg-db-disk`

Now the disk volume is ready

### Deployment

In the `deployment` directory (this one):

* Deploy db: `kubectl apply -f db-kube.yaml`, should see success messages in the logs
* Deploy server: `kubectl apply -f server-kube.yaml`, make sure image src and secrets are updated
* Deploy client: `kubectl apply -f client-kube.yaml`

Initialize your tiler for helm, if not done yet: `helm init`.


Install `nginx-ingress`: `helm install stable/nginx-ingress --name nginx-ingress -f infra/helm-nginx-ingress.yaml`, make sure you update the load balancer's ip. You should create a regional static ip for this if you haven't yet.
Install `kube-lego`: `helm install stable/kube-lego --name lego -f infra/helm-lego.yaml`, make sure you update your email address for the certificate

If they are already installed, use `update` command instead.

Once the nginx controller is ready, you can deploy the ingress: `kubectl apply -f ingress.yaml`

Once you have configured the DNS records to point the domain name to the static ip, the ssl certification process should be able to start and eventually get the ssl support for the site.

To debug, look into the `kube-lego` pod logs.

## Kubectl Tips

Useful commands:

* Monitor the status using `kubectl get services`, `kubectl get deployments`, `kubectl get pods`
* See logs, `kubectl logs <pod_id>`
* Run command `kubectl exec <pod_id> -- <command>`
