scp -i newcrf.pem -r ./dist/ ubuntu@34.242.1.107:/home/ubuntu/hbrapp
scp -i newcrf.pem -r ./docker-compose.yml ubuntu@34.242.1.107:/home/ubuntu/hbrapp/docker-compose.yml
scp -i newcrf.pem ./nginx.conf ubuntu@34.242.1.107:/home/ubuntu/hbrapp/nginx.conf