docker stop ppserver
docker rm ppserver

docker run -d --rm --name ppserver \
-p 8055:3000 \
-v $(pwd):/app \
-v /mnt/sdb:/d4t \
-v /mnt/d3t:/d3t \
-v /mnt/d2t1:/d2t1 \
-v /mnt/sdc:/d2t \
-v /mnt/d250:/d250 \
udditypl/cnpm sh -c "cd app && npm run start"
