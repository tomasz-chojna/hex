FROM node:8.9.1
COPY . /code
WORKDIR /code
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
