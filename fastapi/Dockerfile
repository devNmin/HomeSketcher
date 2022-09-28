FROM python:3.10

RUN apt-get -y update

RUN apt-get -y install vim 

RUN mkdir /app

# ADD . /app

WORKDIR /app

COPY requirements.txt ./
 
RUN pip3 install --upgrade pip 

RUN pip3 install -r requirements.txt 

COPY . /app

EXPOSE 8003
 