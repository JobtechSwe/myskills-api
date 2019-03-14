#!/bin/bash
docker login -u $DOCKER_USER -p $DOCKER_PASS
REPO=jobtechswe/myskills-api

docker build -f Dockerfile -t $REPO .
echo $TRAVIS_BRANCH
echo $TRAVIS_TAG

if [[ "$TRAVIS_BRANCH" == "master" ]]; then
  TAG="latest"
  echo "building latest"
  docker tag $REPO $REPO:$TAG
  docker push $REPO:$TAG
fi

if [[ -z "$TRAVIS_TAG" ]]; then
  echo "building tag"
  docker tag $REPO $REPO:$TRAVIS_TAG
  docker tag $REPO $REPO:"latest-tag-release"

  docker push $REPO:$TRAVIS_TAG
  docker push $REPO:"latest-tag-release"
fi
