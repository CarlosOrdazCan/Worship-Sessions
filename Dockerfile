FROM nginx:alpine
COPY . /usr/share/nginx/html

# Expose port 80 (default for nginx)
EXPOSE 80
