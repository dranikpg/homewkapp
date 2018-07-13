echo "Deploying js app"
npm run-script build -ddd
cp -r ./build/* /var/www/html/
