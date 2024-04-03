# variables
mykey="my-key.pem"
frontip="1.1.1.1"
skipbuild=true

# change content of .env.production
echo "Changing content of .env..."
sleep 2
if [ -f .env ]; then
    echo ".env file exists."
else
    echo ".env file does not exist. Creating .env file..."
    sleep 2
    touch .env
fi
sudo bash -c 'cat <<EOF > .env
VITE_SERVICES_BASE_URL=/api
EOF'
echo "Content of .env changed."
sleep 2
clear

# build
if [ $skipbuild = true ]; then
    echo "Skipping build..."
    sleep 2
else
    echo "Building application..."
    sleep 2
    npm run build
    if [ $? -eq 0 ]; then
        echo "Build successful."
    else
        echo "Build failed."
    fi
    sleep 2
    clear
fi

# zip dist
echo "Zipping dist..."
sleep 2
zip -v
if [ $? -eq 0 ]; then
    echo "Zip is installed."
else
    echo "Zip is not installed. Installing zip..."
    sleep 2
    sudo apt update
    sudo apt install zip
fi
zip -r dist.zip dist
echo "dist zipped."
sleep 2
clear

# deploy
echo "Deploying dist.zip to $frontip..."
sudo scp -i "/home/urubu100/.ssh/$mykey" dist.zip ubuntu@$frontip:/home/ubuntu
echo "dist.zip deployed."
sleep 2
clear

# sending deploy-nginx.bash to ec2
echo "Sending deploy-nginx.bash to EC2 instance..."
sudo scp -i "/home/urubu100/.ssh/$mykey" deploy-nginx.bash ubuntu@$frontip:/home/ubuntu/deploy-nginx.bash
echo "deploy-nginx.bash sent."
sleep 2

# connect to ec2
echo "Connecting to EC2 instance..."
sleep 2
sudo ssh -i "/home/urubu100/.ssh/$mykey" ubuntu@$frontip
