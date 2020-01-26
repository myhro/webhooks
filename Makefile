export CGO_ENABLED := 0
export GOOS := linux

IMAGE := myhro/webhooks
VERSION := $(shell git rev-parse --short HEAD)

api-build:
	make -C api/ build

build: api-build webapp-deps webapp-build-bundle docker

build-prod: api-build webapp-deps webapp-build-bundle-prod docker-prod

clean:
	make -C api/ clean
	make -C webapp/ clean

deploy:
	sed -i 's/IMAGE_VERSION/$(VERSION)/' k8s/*/deployment.yaml
	kubectl apply -f k8s/api/
	kubectl apply -f k8s/lb/
	kubectl apply -f k8s/webapp/

docker:
	docker build -t $(IMAGE):development .

docker-prod:
	docker build -t $(IMAGE) .
	docker tag $(IMAGE):latest $(IMAGE):$(VERSION)

deps-ci:
	sudo apt update
	sudo apt install -y upx-ucl

push:
	docker push $(IMAGE):$(VERSION)
	docker push $(IMAGE):latest

webapp-build-bundle:
	make -C webapp/ build-bundle

webapp-build-bundle-prod:
	make -C webapp/ build-bundle-prod

webapp-deps:
	make -C webapp/ deps
