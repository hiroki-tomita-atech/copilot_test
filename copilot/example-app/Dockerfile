FROM node:16-alpine

WORKDIR /app
RUN npm install express @aws-sdk/client-sns
# COPY ./copilot/example-app/src/ /app/src/
COPY src/ /app/src/
EXPOSE 8080
CMD ["node", "./src/server.js"]