DEPLOY_FILE := deploy-k8s.yaml
ENV ?= staging
IMAGE := myhro/webhooks
TUNNEL ?= 263f569b-32bc-4c00-a3c5-7b48e0c9832e
VERSION ?= $(shell git rev-parse --short HEAD)

build:
	docker build -t $(IMAGE) .

clean:
	make -C api/ clean
	make -C webapp/ clean
	docker rmi -f $(IMAGE)

deploy:
	find k8s/ -name '*.yaml' -exec sed 's/<ENV>/$(ENV)/;s/<TUNNEL>/$(TUNNEL)/;s/<VERSION>/$(VERSION)/' {} \; > $(DEPLOY_FILE)
	kubectl apply -f $(DEPLOY_FILE)

push:
	docker tag $(IMAGE):latest $(IMAGE):$(VERSION)
	docker push $(IMAGE):$(VERSION)
	docker push $(IMAGE):latest
