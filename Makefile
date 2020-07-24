.PHONY: setup run hosts rebuild-run
SHELL := bash

#Text color codes
RED=`tput setaf 1`
GREEN=`tput setaf 2`
RESET=`tput sgr0`

setup:
	@echo
	@echo "${GREEN}Backend Dependencies Download!${RESET}"
	cd register-users-backend; \
	npm i
	@echo
	@echo "${GREEN}Frontend Dependencies Download!${RESET}"
	cd register-users-frontend; \
	npm i
	@echo
	@echo "${GREEN}Setting up postgres with its backup${RESET}"
	docker-compose up -d postgres
	sleep 5
	docker-compose exec -T postgres dropdb users -U postgres
	docker-compose exec -T postgres createdb users -U postgres
	docker-compose exec -T postgres pg_restore -U postgres -v -d users < ./register-users-backend/users.backup
	@echo
	@echo "${GREEN}Postgres Dump imported successfully!${RESET}"

hosts:
	@echo
	@echo "${GREEN}Setting up hosts configurations${RESET}"
	echo '127.0.0.1	backend.register-users.com.br' >> /etc/hosts
	echo '127.0.0.1	frontend.register-users.com.br' >> /etc/hosts
	@echo
	@echo "${GREEN}Hosts congiured successfully${RESET}"

run: hosts setup
	@echo
	@echo "${GREEN}Running All Services${RESET}"
	docker-compose down
	docker-compose up -d

rebuild-run:
	@echo
	@echo "${GREEN}Rebuilding Services${RESET}"
	docker-compose up -d --build
	