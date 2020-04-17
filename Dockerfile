FROM docker:dind

RUN apk update --no-cache

RUN apk add git bash python3 python3-dev && \
    apk add --no-cache --virtual build-deps build-base gcc && \
    pip3 install --no-cache-dir --upgrade pip && \
    pip3 install awscli aws-sam-cli && \
    apk del build-deps

ENV TZ Asia/Tokyo
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/${TZ} /etc/localtime && \
    echo ${TZ} > /etc/timezone && \
    apk del tzdata

RUN apk add --no-cache nodejs nodejs-npm

RUN mkdir /root/.aws
COPY ./credentials /root/.aws/credentials

WORKDIR /app
