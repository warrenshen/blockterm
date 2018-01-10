echo "Building docker images for client"
echo "docker build -f deployment/Dockerfile.client -t us.gcr.io/block-191602/client ."
docker build -f deployment/Dockerfile.client -t us.gcr.io/block-191602/client .

echo "Building docker images for server"
echo "docker build -f deployment/Dockerfile.server -t us.gcr.io/block-191602/server ."
docker build -f deployment/Dockerfile.server -t us.gcr.io/block-191602/server .

