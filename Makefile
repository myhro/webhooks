IMAGE := myhro/webhooks
VERSION := $(shell git rev-parse --short HEAD)

build: webapp-deps webapp-build docker

build-prod: webapp-deps webapp-build-prod docker

clean:
	make -C api/ clean
	make -C webapp/ clean
	docker rmi -f $(IMAGE)

deploy:
	sed -i 's/IMAGE_VERSION/$(VERSION)/' k8s/*/deployment.yaml
	kubectl apply -f k8s/api/
	kubectl apply -f k8s/lb/
	kubectl apply -f k8s/webapp/

docker:
	docker build -t $(IMAGE) .

push:
	docker tag $(IMAGE):latest $(IMAGE):$(VERSION)
	docker push $(IMAGE):$(VERSION)
	docker push $(IMAGE):latest

webapp-build:
	make -C webapp/ build

webapp-build-prod:
	make -C webapp/ build-prod

webapp-deps:
	make -C webapp/ deps
