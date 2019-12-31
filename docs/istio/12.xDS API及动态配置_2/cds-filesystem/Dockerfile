FROM envoyproxy/envoy-alpine:v1.11.0


COPY  ./eds.conf ./envoy.yaml ./cds.conf ./cds.conf.v2 /etc/envoy/

RUN apk update && apk --no-cache add curl
