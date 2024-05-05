# Como fazer deploy do projeto

1. instalar nginx na EC2
2. Na EC2, executar
 ```bash
 sudo vim /etc/nginx/sites-available/default
 ``` 
3. Configurar api gatway redirecionando para api com uma proxy_pass e alterar location / para renderizar front
4. 
```bash
server {

        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www/html;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name _;

         location ^~ /api/ {
               proxy_pass http://10.0.0.139:8080;
         }

        location / {
                try_files $uri $uri/ /index.html;
        }


}
```
1. Executar
```bash e renomear index.html para teste.html
cd /var/www/html/ 
sudo mv index.html teste.html
``` 

1. Buildar projeto, compactar /dist e enviar para a EC2
```bash	
npm run build
# compactar /dist
scp -i "ec2-ssh-key.pem" "/caminho/dist.zip" ubuntu@35.175.0.99:/home/ubuntu
```
1. Mover dist.zip para /var/www/html
```bash
sudo mv /home/ubuntu/dist.zip /var/www/html
```
1. Entrar no /var/www/html
```bash
cd /var/www/html
```
1. Descompactar dist.zip para pasta atual
```bash
sudo unzip /var/www/html/dist.zip
```
1. Remover dist.zip e mover conteudo do dist para /var/www/html
```bash
sudo rm /var/www/html/dist.zip
sudo mv /var/www/html/dist/* /var/www/html

```
10. Reinicar servico nginx
```bash
sudo systemctl restart nginx
```

scp -i "ec2-ssh-key.pem" "/mnt/c/Users/muril/Documents/Repositorios GitHub/Projetos de PI/TechHub/Tech-Hub-Client/dist.zip" ubuntu@35.175.0.99:/home/ubuntu

sudo mv /home/ubuntu/dist.zip /var/www/html