include .env

up:
	docker-compose up -d

down:
	docker-compose down -v --remove-orphans

reset:
	docker-compose down -v --remove-orphans
	docker rmi postgres:12.2-alpine --force
	docker-compose up

##Eslint CORREÇÃO DE ERROS
eslint:
	npx eslint ./src --fix"