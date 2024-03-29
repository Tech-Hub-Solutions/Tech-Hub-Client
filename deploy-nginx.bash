# verify if nginx is installed. Else, install it
echo "Verifying if nginx is installed..."
sleep 2
sudo nginx -v

if [ $? -eq 0 ]; then
    echo "Nginx is installed."
    sleep 2
    clear
else
    echo "Nginx is not installed. Installing nginx..."
    sleep 2
    sudo apt update
    sudo apt install nginx
    clear
fi

# change content of nginx default file
echo "Configuring nginx..."
sleep 2
sudo rm /etc/nginx/sites-available/default
sudo bash -c 'cat <<EOF > /etc/nginx/sites-available/default
    server {
        listen 80 default_server;
        listen [::]:80 default_server;
        root /var/www/html;
        index index.html index.htm index.nginx-debian.html;
        server_name _;

        location ^~ /api/ {
            proxy_pass http://10.0.0.162:8080;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        location / {
            try_files \$uri \$uri/ /index.html;
        }
    }'
sleep 2
echo "Nginx proxy configured."
clear

# move content inside nginx
echo "Moving /dist to nginx..."
sleep 2
sudo rm -rf /var/www/html/*
sudo unzip dist.zip -d /var/www/html
sudo rm dist.zip
sudo mv /var/www/html/dist/* /var/www/html
echo "Content moved."
sleep 2
clear

# restart nginx
echo "Reloading nginx..."
sleep 2
sudo systemctl reload nginx

echo "Nginx reloaded. You can now access your application"