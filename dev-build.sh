echo "Building docker images for client"
echo "docker build -f deployment/Dockerfile.client -t us.gcr.io/crypto-trends/client ."
docker build -f deployment/Dockerfile.client -t us.gcr.io/crypto-trends/client .

echo "Building docker images for server"
echo "docker build -f deployment/Dockerfile.server -t us.gcr.io/crypto-trends/server ."
docker build -f deployment/Dockerfile.server -t us.gcr.io/crypto-trends/server .

