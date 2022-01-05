npm run build
docker build --target production -t reamixed-prod:latest .
docker tag reamixed-prod:latest  gcr.io/mindful-pillar-284616/reamixed
docker push gcr.io/mindful-pillar-284616/reamixed
