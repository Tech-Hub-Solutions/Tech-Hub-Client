sudo apt install certbot
sudo certbot certonly --standalone -d tech-hub.ddns.net

docker cp container:/etc/letsencrypt /etc/letsencrypt
docker exec -it container bash
nginx -s reload

# delete
sudo certbot delete