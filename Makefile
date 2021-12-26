ENV ?= staging
IMAGE := myhro/webhooks
VERSION ?= $(shell git rev-parse --short HEAD)

build:
	docker build -t $(IMAGE) .

clean:
	make -C api/ clean
	make -C webapp/ clean
	docker rmi -f $(IMAGE)

push:
	docker tag $(IMAGE):latest $(IMAGE):$(VERSION)
	docker push $(IMAGE):$(VERSION)
	docker push $(IMAGE):latest
